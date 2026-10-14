const Ride = require("../models/Ride");

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find({}).populate(
      "driver",
      "username email phone"
    );
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate(
      "driver",
      "username email phone"
    );
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postRide = async (req, res) => {
  try {
    const {
      type,
      pickup,
      destination,
      date,
      time,
      seats,
      vehicle,
      phone,
      notes,
      price
    } = req.body;

    const ride = await Ride.create({
      driver: req.user.id,
      driverName: req.user.username,
      type,
      pickup,
      destination,
      date,
      time,
      seats,
      vehicle,
      phone,
      notes,
      price
    });

    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await ride.deleteOne();

    res.json({ message: "Ride deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
