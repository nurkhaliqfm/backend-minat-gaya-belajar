const express = require("express");
const router = express.Router();
const refreshTokenControllers = require("../controllers/refreshTokenControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/token", verifyJWT, refreshTokenControllers.userRefreshToken);

module.exports = router;
