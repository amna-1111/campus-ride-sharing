const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    driverName: { type: String },
    type: {
      type: String,
      enum: ["offering", "requesting"],
      default: "offering"
    },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seats: { type: Number, required: true },
    vehicle: { type: String },
    phone: { type: String },
    notes: { type: String },
    price: { type: Number },
    bookedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
