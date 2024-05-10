const express = require("express");
const router = express.Router();
const bankSoalControllers = require("../../controllers/bankSoalControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/:id", verifyJWT, bankSoalControllers.getBankSoalByCategory);
router.get(
  "/category/:id",
  verifyJWT,
  bankSoalControllers.getBankSoalByCategory
);

module.exports = router;
