import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../styles/PostRide.css";

//import { addRide } from "../store/rideSlice";

import { api } from "../api";

function PostRide() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useSelector((state) => state.user);

  const [rideType, setRideType] = useState("offering");

  const [error, setError] = useState("");

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // gives "2026-03-30"
  const currentTime = now.toTimeString().slice(0, 5); // gives "16:32"

  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: currentDate,
    time: currentTime,
    seats: "",
    vehicle: "",
    phone: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      setError("Please select a future date and time.");
      return;
    }

    if (
      !formData.pickup ||
      !formData.destination ||
      !formData.seats ||
      !formData.vehicle
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // dispatch(
    //   addRide({
    //     id: Date.now(),
    //     postedBy: loggedInUser.id,
    //     driverName: loggedInUser.username,
    //     type: rideType,
    //     pickup: formData.pickup,
    //     destination: formData.destination,
    //     date: formData.date,
    //     time: formData.time,
    //     seats: parseInt(formData.seats),
    //     vehicle: formData.vehicle,
    //     phone: formData.phone || loggedInUser.phone,
    //     whatsapp: formData.phone || loggedInUser.phone,
    //     notes: formData.notes,
    //     bookedBy: []
    //   })
    // );

    // navigate("/rides");

    const result = await api.postRide({
      type: rideType,
      pickup: formData.pickup,
      destination: formData.destination,
      date: formData.date,
      time: formData.time,
      seats: parseInt(formData.seats),
      vehicle: formData.vehicle,
      phone: formData.phone || loggedInUser.phone,
      notes: formData.notes
    });

    if (result._id) {
      navigate("/rides");
    } else {
      setError(result.message || "Failed to post ride.");
    }
  };

  return (
    <div className="post-ride-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="post-ride-card">
        <h1 className="post-ride-heading">Post Your Rides</h1>

        <div className="ride-type-toggle">
          <label
            className={`toggle-option ${rideType === "offering" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="rideType"
              value="offering"
              checked={rideType === "offering"}
              onChange={() => setRideType("offering")}
            />
            Offering a Ride
          </label>
          <label
            className={`toggle-option ${rideType === "requesting" ? "active" : ""}`}
          >
            <input
              type="radio"
              name="rideType"
              value="requesting"
              checked={rideType === "requesting"}
              onChange={() => setRideType("requesting")}
            />
            Requesting a Ride
          </label>
        </div>

        <form onSubmit={handleSubmit} className="post-ride-form">
          {/* Two column grid */}
          <div className="form-grid">
            <div className="form-input">
              <label>Pickup Location *</label>
              <input
                type="text"
                name="pickup"
                placeholder="e.g. DHA Phase 6"
                value={formData.pickup}
                onChange={handleChange}
              />
            </div>

            <div className="form-input">
              <label>Destination *</label>
              <input
                type="text"
                name="destination"
                placeholder="e.g. FAST NUCES Campus"
                value={formData.destination}
                onChange={handleChange}
              />
            </div>

            <div className="form-input">
              <label>Date</label>
              <input
                type="date"
                name="date"
                min={currentDate}
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-input">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <label>
                {rideType === "offering"
                  ? "Available Seats *"
                  : "Total Passengers *"}
              </label>
              <input
                type="number"
                name="seats"
                placeholder="e.g. 3"
                min="1"
                max="10"
                value={formData.seats}
                onChange={handleChange}
              />
            </div>

            {/* Only show vehicle for offering */}
            {rideType === "offering" && (
              <div className="form-input">
                <label> Vehicle </label>
                <input
                  type="text"
                  name="vehicle"
                  placeholder="e.g. Suzuki Alto"
                  value={formData.vehicle}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-input">
              <label>Contact Number</label>
              <input
                type="text"
                name="phone"
                placeholder="e.g. 03001234567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Notes — full width */}
          <div className="form-input">
            <label>Notes</label>
            <textarea
              name="notes"
              placeholder="Any additional info e.g. AC available, no smoking..."
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {error && <p className="post-error">{error}</p>}

          <button type="submit" className="post-submit-btn">
            {rideType === "offering" ? "Post Ride →" : "Request Ride →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostRide;
