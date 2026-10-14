const express = require("express");
const router = express.Router();
const {
  getRides,
  getRideById,
  postRide,
  deleteRide
} = require("../controllers/rideController");
const protect = require("../middleware/authMiddleware");

router.get("/", getRides);
router.get("/:id", getRideById);
router.post("/", protect, postRide);
router.delete("/:id", protect, deleteRide);

module.exports = router;
