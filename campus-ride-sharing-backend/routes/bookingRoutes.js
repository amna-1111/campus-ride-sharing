const express = require("express");
const router = express.Router();
const { bookRide, getMyBookings } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, bookRide);
router.get("/my", protect, getMyBookings);

module.exports = router;
