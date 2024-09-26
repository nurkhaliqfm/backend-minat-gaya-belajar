const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

var publicKey = fs.readFileSync("./key/public.key");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer "))
		return res.status(401).json({
			message: "Access Credential is not authorized",
			hint: "Access Credential is Wrong",
		});

	const token = authHeader.split(" ")[1];

	jwt.verify(token, publicKey, async (err, decoded) => {
		if (err) {
			decoded = jwt.decode(token);
			if (!decoded) {
				return res.status(401).json({
					message: "The request is forbidden by the server",
					hint: "Access Credential is Wrong",
				});
			}
		}

		const getUsersCredentials = await db.sequelize.query(
			`SELECT oauth_authorization_codes.id, oauth_authorization_codes.authorization_codes, oauth_access_tokens.access_token, oauth_access_tokens.access_token_expires_at, oauth_refresh_tokens.refresh_token, oauth_refresh_tokens.refresh_token_expires_at FROM oauth_authorization_codes INNER JOIN oauth_access_tokens ON oauth_authorization_codes.id = oauth_access_tokens.id_auth INNER JOIN oauth_refresh_tokens ON oauth_authorization_codes.id = oauth_refresh_tokens.id_auth WHERE oauth_authorization_codes.id = ${decoded.UserInfo.id_auth}`
		);

		if (!getUsersCredentials)
			return res
				.status(401)
				.json({ message: "These credentials do not match our records." });

		const userCredentials = getUsersCredentials[0][0];

		if (
			Date.now() > userCredentials.access_token_expires_at &&
			Date.now() > userCredentials.refresh_token_expires_at
		)
			return res.status(401).json({
				message: "The request is forbidden by the server",
				hint: "Access Token is Expired",
			});

		const isUserLogin = userCredentials.refresh_token !== null ? true : false;
		const isAccessToken =
			userCredentials.access_token !== null &&
			userCredentials.access_token === token
				? true
				: false;

		if (
			decoded.UserInfo.clientSecret !== process.env.CLIENT_SECRET ||
			!isUserLogin ||
			!isAccessToken
		) {
			return res.status(401).json({
				message: "The request is forbidden by the server",
				hint: "Access Credential is Wrong",
			});
		}

		req.id = decoded.UserInfo.id;
		req.id_auth = decoded.UserInfo.id_auth;
		req.client_id = decoded.UserInfo.clientId;
		req.client_secret = decoded.UserInfo.clientSecret;

		next();
	});
};

module.exports = verifyJWT;
