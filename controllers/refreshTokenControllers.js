const { oauth_access_tokens, oauth_refresh_tokens } = require("../models");
const db = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

var privateKey = fs.readFileSync("./key/private.key");

const userRefreshToken = async (req, res) => {
  const { id, client_secret, client_id, id_auth } = req;

  const getUsersCredentials = await db.sequelize.query(
    `SELECT oauth_authorization_codes.id, oauth_authorization_codes.authorization_codes, oauth_access_tokens.access_token, oauth_access_tokens.access_token_expires_at, oauth_refresh_tokens.refresh_token, oauth_refresh_tokens.refresh_token_expires_at FROM oauth_authorization_codes INNER JOIN oauth_access_tokens ON oauth_authorization_codes.id = oauth_access_tokens.id_auth INNER JOIN oauth_refresh_tokens ON oauth_authorization_codes.id = oauth_refresh_tokens.id_auth WHERE oauth_authorization_codes.id = ${id_auth} && oauth_authorization_codes.id_user = ${id}`
  );

  if (!getUsersCredentials)
    return res
      .status(401)
      .json({ message: "These credentials do not match our records." });

  const userCredentials = getUsersCredentials[0][0];

  jwt.verify(
    userCredentials.refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || userCredentials.id !== decoded.id_auth)
        return res.status(401).json({
          message: "The request is forbidden by the server",
          hint: "Access Credential is Wrong",
        });

      if (Date.now() > userCredentials.refresh_token_expires_at)
        return res.status(401).json({
          message: "The request is forbidden by the server",
          hint: "Refresh Token is Expired",
        });

      const access_token_expires_at = Date.now() + 1800 * 1000;
      const refresh_token_expires_at = Date.now() + 24 * 60 * 60 * 30 * 1000;

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: id,
            clientId: client_id,
            clientSecret: client_secret,
            id_auth: id_auth,
            grant_type: process.env.GRANT_TYPE,
          },
        },
        privateKey,
        { expiresIn: "30m", algorithm: "RS256" }
      );

      const refreshToken = jwt.sign(
        {
          id: id,
          clientSecret: client_secret,
          id_auth: id_auth,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      await oauth_access_tokens.update(
        {
          access_token: accessToken,
          access_token_expires_at: access_token_expires_at,
          id_auth: id_auth,
        },
        { where: { id_auth: id_auth } }
      );

      await oauth_refresh_tokens.update(
        {
          refresh_token: refreshToken,
          refresh_token_expires_at: refresh_token_expires_at,
          id_auth: id_auth,
        },
        { where: { id_auth: id_auth } }
      );

      res.status(200).json({
        expires_in: access_token_expires_at,
        access_token: accessToken,
      });
    }
  );
};

module.exports = { userRefreshToken };
