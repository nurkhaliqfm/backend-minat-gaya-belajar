const express = require("express");
const router = express.Router();
const eventControllers = require("../../controllers/eventControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/", verifyJWT, eventControllers.getEvent);
router.get("/result/:id_event", verifyJWT, eventControllers.getEventHistory);
router.get(
  "/school-result/:id_event",
  verifyJWT,
  eventControllers.getEventHistoryBySchool
);
router.post("/event-history", verifyJWT, eventControllers.createEventHistory);

module.exports = router;
