const express = require("express");
const router = express.Router();
const eventControllers = require("../../controllers/eventControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/", verifyJWT, eventControllers.getEventTryout);

module.exports = router;
