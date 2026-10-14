import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { bookRide } from "../store/rideSlice";
import "../styles/RideDetails.css";

import { api } from "../api";

function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  //const { rides } = useSelector((state) => state.rides);
  const { loggedInUser } = useSelector((state) => state.user);

  // find the ride by id
  //const ride = rides.find((r) => r.id === parseInt(id));

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingMsg, setBookingMsg] = useState("");

  // fetch ride from backend on load
  useEffect(() => {
    const fetchRide = async () => {
      const data = await api.getRideById(id);
      setRide(data);
      setLoading(false);
    };
    fetchRide();
  }, [id]);

  if (loading)
    return (
      <div className="ride-details-page">
        <p>Loading...</p>
      </div>
    );

  // if ride not found
  if (!ride || ride.message === "Ride not found") {
    return (
      <div className="ride-details-page">
        <p>Ride not found.</p>
        <button onClick={() => navigate("/rides")}>Back to Rides</button>
      </div>
    );
  }

  // check if user already booked this ride
  const alreadyBooked = ride.bookedBy?.some(
    (id) => id.toString() === loggedInUser?.id
  );
  const isOwnRide = ride.driver?._id === loggedInUser?.id;

  const handleBook = async () => {
    if (!loggedInUser) {
      navigate("/login"); // redirect to login if not logged in
      return;
    }

    if (isOwnRide || alreadyBooked || ride.seats <= 0) return;

    //dispatch(bookRide({ rideId: ride.id, userId: loggedInUser.id }));

    const result = await api.bookRide(ride._id);

    if (result.message === "Already booked this ride") {
      setBookingMsg("You have already booked this ride!");
      return;
    }

    if (result._id) {
      setBookingMsg("Ride booked sucessfully!");

      setRide({
        ...ride,
        seats: ride.seats - 1,
        bookedBy: [...(ride.bookedBy || []), loggedInUser.id]
      });
    } else {
      setBookingMsg(result.message || "Booking failed.");
    }
  };

  return (
    <div className="ride-details-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/rides")}>
        ← Back to Rides
      </button>

      <div className="ride-details-card">
        {/* Header */}
        <div className="details-header">
          <div>
            <p className="details-posted-by">
              Posted by{" "}
              <strong
                className="driver-link"
                onClick={() => navigate(`/profile/${ride.driver?._id}`)}
              >
                {ride.driverName}
              </strong>
            </p>
          </div>
          <span className={`ride-type-tag ${ride.type}`}>
            {ride.type === "offering" ? "Offering Ride" : "Requesting Ride"}
          </span>
        </div>

        {/* Ride Info */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">📅 Date</span>
            <span className="detail-value">{ride.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🕐 Time</span>
            <span className="detail-value">{ride.time}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📍 Pickup</span>
            <span className="detail-value">{ride.pickup}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🏁 Destination</span>
            <span className="detail-value">{ride.destination}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              {ride.type === "offering"
                ? "👥 Seats Available"
                : "👤 Passengers"}
            </span>
            <span className="detail-value">{ride.seats}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🚗 Vehicle</span>
            <span className="detail-value">{ride.vehicle}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📞 Contact</span>
            <span className="detail-value">{ride.phone}</span>
          </div>
        </div>

        {/* Notes */}
        {ride.notes && (
          <div className="details-notes">
            <span className="detail-label">📝 Notes</span>
            <p>{ride.notes}</p>
          </div>
        )}

        {/* Booking message */}
        {bookingMsg && <p className="booking-msg">{bookingMsg}</p>}

        {/* Action buttons */}
        <div className="details-actions">
          {/* Book button */}
          {ride.type === "offering" && (
            <button
              className={`btn-book ${isOwnRide ? "own" : ""} ${alreadyBooked ? "booked" : ""} ${ride.seats <= 0 ? "full" : ""}`}
              onClick={handleBook}
              disabled={isOwnRide || alreadyBooked || ride.seats <= 0}
            >
              {!loggedInUser
                ? "Login to Book"
                : isOwnRide
                  ? "Your Own Ride"
                  : alreadyBooked
                    ? "Booked"
                    : ride.seats <= 0
                      ? "No Seats Available"
                      : "Book a Seat"}
            </button>
          )}

          {/* Contact buttons */}
          <a
            href={`https://wa.me/${ride.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp-details"
          >
            WhatsApp 💬
          </a>
          <a href={`tel:${ride.phone}`} className="btn-call-details">
            Call 📞
          </a>

          {/* View profile */}
          <button
            className="btn-profile"
            onClick={() => navigate(`/profile/${ride.driver?._id}`)}
          >
            {ride.type === "offering"
              ? "View Driver Profile"
              : "View Requestor Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RideDetails;
