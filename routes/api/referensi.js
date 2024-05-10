const express = require("express");
const router = express.Router();
const referensiControllers = require("../../controllers/referensiControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/category", verifyJWT, referensiControllers.getCategory);
router.get(
  "/subCategory/:id",
  verifyJWT,
  referensiControllers.getSubCategoryByCategoryId
);
router.get("/soalType", verifyJWT, referensiControllers.getSoalType);
router.get("/sumberPaket", verifyJWT, referensiControllers.getSumberPaket);

module.exports = router;
