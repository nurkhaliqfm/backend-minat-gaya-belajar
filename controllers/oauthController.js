const {
	users,
	biodata_users,
	oauth_access_tokens,
	oauth_refresh_tokens,
	oauth_authorization_codes,
} = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

var privateKey = fs.readFileSync("./key/private.key");

const userLogin = async (req, res) => {
	let { username, password, grant_type } = req.body;
	const token = req.headers.authorization.split(" ")[1];
	const [id_client, client_secret] = Buffer.from(token, "base64")
		.toString("utf-8")
		.split(":");

	if (!username || !password)
		return res
			.status(401)
			.json({ message: "These credentials do not match our records." });

	const userData = await users.findOne({
		where: { email: username },
		include: [
			{
				model: biodata_users,
				as: "biodata_users",
				attributes: ["id", "full_name"],
			},
		],
	});

	if (!userData)
		return res
			.status(401)
			.json({ message: "These credentials do not match our records." });

	bcrypt.compare(password, userData.password).then(async (match) => {
		if (!match)
			return res
				.status(401)
				.json({ message: "These credentials do not match our records." });

		if (!grant_type && grant_type !== process.env.GRANT_TYPE)
			return res.status(400).json({
				error: "invalid_request",
				message:
					"The authorization grant type is not supported by the authorization server.",
			});

		if (!id_client && id_client !== process.env.CLIENT_ID)
			return res.status(400).json({
				error: "invalid_request",
				message:
					"The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.",
			});

		if (!client_secret && client_secret !== process.env.CLIENT_SECRET)
			return res.status(400).json({
				error: "invalid_request",
				message:
					"The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.",
			});

		const authorization_codes = uuidv4();
		const access_token_expires_at = Date.now() + 1800 * 1000;
		const refresh_token_expires_at = Date.now() + 24 * 60 * 60 * 30 * 1000;

		try {
			const createAuthCodes = await oauth_authorization_codes.create({
				authorization_codes: authorization_codes,
				id_user: userData.id,
			});

			const accessToken = jwt.sign(
				{
					UserInfo: {
						id: userData.id,
						clientId: id_client,
						clientSecret: client_secret,
						id_auth: createAuthCodes.id,
						grant_type: password,
					},
				},
				privateKey,
				{ expiresIn: "30m", algorithm: "RS256" }
			);

			const refreshToken = jwt.sign(
				{
					id: userData.id,
					clientSecret: client_secret,
					id_auth: createAuthCodes.id,
				},
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "30d" }
			);

			await oauth_access_tokens.create({
				access_token: accessToken,
				access_token_expires_at: access_token_expires_at,
				id_auth: createAuthCodes.id,
			});

			await oauth_refresh_tokens.create({
				refresh_token: refreshToken,
				refresh_token_expires_at: refresh_token_expires_at,
				id_auth: createAuthCodes.id,
			});

			res.status(200).json({
				name: userData.biodata_users.full_name,
				role: roleConverter(userData.role_id),
				expires_in: access_token_expires_at,
				access_token: accessToken,
			});
		} catch (error) {
			res.status(401).json({
				message: "Authentication failed with this cradentials",
			});
		}
	});
};

module.exports = { userLogin };

function roleConverter(roleId) {
	switch (roleId) {
		case 0:
			return "Super";
		case 1:
			return "Admin";
		case 2:
			return "User";
	}
}
