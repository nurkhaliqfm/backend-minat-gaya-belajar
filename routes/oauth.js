const express = require("express");
const router = express.Router();
const oauthControllers = require("../controllers/oauthController");

router.post("/token", oauthControllers.userLogin);

module.exports = router;
