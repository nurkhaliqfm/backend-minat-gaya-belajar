const express = require("express");
const router = express.Router();
const logoutControllers = require("../controllers/logoutControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", verifyJWT, logoutControllers.userLogout);

module.exports = router;
