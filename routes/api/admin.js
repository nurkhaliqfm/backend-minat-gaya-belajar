const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/userControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.post("/", verifyJWT, usersControllers.createAdmin);
router.patch("/:userId", verifyJWT, usersControllers.updateUser);
router.delete("/:userId", verifyJWT, usersControllers.deleteUser);

module.exports = router;
