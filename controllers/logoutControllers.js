const { oauth_authorization_codes } = require("../models");

const userLogout = async (req, res) => {
  const { id_auth } = req;

  try {
    await oauth_authorization_codes.destroy({ where: { id: id_auth } });
    res.status(200).json({ message: "Success logout" });
  } catch (error) {
    console.error("Error logout user:", error);
  }
};

module.exports = { userLogout };
