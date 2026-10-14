import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RideCard from "../components/RideCard";
import "../styles/Bookings.css";

import { api } from "../api";

function Bookings() {
  const navigate = useNavigate();

  //const { rides } = useSelector((state) => state.rides);

  const { loggedInUser } = useSelector((state) => state.user);

  const [bookedRides, setBookedRides] = useState([]);
  const [postedRides, setPostedRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // const bookedRides = rides.filter((ride) =>
  //   ride.bookedBy?.includes(loggedInUser?.id)
  // );

  // const postedRides = rides.filter(
  //   (ride) => ride.postedBy === loggedInUser?.id
  // );

  useEffect(() => {
    const fetchData = async () => {
      // fetch rides I booked
      const bookings = await api.getMyBookings();
      // each booking has a populated 'ride' object
      const booked = bookings.map((b) => b.ride).filter(Boolean);
      setBookedRides(booked);

      // fetch all rides, then filter by driver
      const allRides = await api.getRides();
      const posted = allRides.filter(
        (ride) => ride.driver?._id === loggedInUser?.id
      );
      setPostedRides(posted);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="bookings-page">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="bookings-page">
      <h1 className="bookings-title">My Activity</h1>

      {/* ── BOOKED RIDES ── */}
      <section className="bookings-section">
        <h2 className="section-title">Rides I Booked</h2>

        {bookedRides.length > 0 ? (
          <div className="rides-grid">
            {bookedRides.map((ride) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div>
        ) : (
          <div className="bookings-empty">
            <p>You haven't booked any rides yet.</p>
            <button
              className="bookings-browse-btn"
              onClick={() => navigate("/rides")}
            >
              Browse Rides
            </button>
          </div>
        )}
      </section>

      {/* ── POSTED RIDES ── */}
      <section className="bookings-section">
        <h2 className="section-title">Rides I Posted</h2>

        {postedRides.length > 0 ? (
          <div className="rides-grid">
            {postedRides.map((ride) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div>
        ) : (
          <div className="bookings-empty">
            <p>You haven't posted any rides yet.</p>
            <button
              className="bookings-browse-btn"
              onClick={() => navigate("/post-ride")}
            >
              Post a Ride
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Bookings;
