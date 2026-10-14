//bookride + mybookings
const Booking = require("../models/Booking");
const Ride = require("../models/Ride");

exports.bookRide = async (req, res) => {
  try {
    const { rideId, seats = 1 } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (ride.seats < seats) {
      return res.status(400).json({ message: "Not enough seats" });
    }

    // Prevent double booking
    const existing = await Booking.findOne({ ride: rideId, user: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Already booked this ride" });
    }

    ride.seats -= seats;

    if (!ride.bookedBy) ride.bookedBy = [];
    ride.bookedBy.push(req.user.id);

    await ride.save();

    const booking = await Booking.create({
      ride: rideId,
      user: req.user.id,
      seats
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/my  — view my bookings (protected)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate({
      path: "ride",
      populate: { path: "driver", select: "name email" }
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
