const express = require("express");
const router = express.Router();
const bundleSoalControllers = require("../../controllers/bundelSoalControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.get(
  "/:kode_event",
  verifyJWT,
  bundleSoalControllers.getBundelSoalByEvent
);

module.exports = router;
