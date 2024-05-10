const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/userControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.post("/register", usersControllers.registUser);
router.patch("/:userId", verifyJWT, usersControllers.updateUser);

module.exports = router;
