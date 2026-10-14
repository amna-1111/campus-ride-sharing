import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { deleteRide } from "../store/rideSlice";
import { useState, useEffect } from "react";

import { api } from "../api";

import RideCard from "../components/RideCard";
import "../styles/UserProfile.css";

function UserProfile() {
  //const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  //const { users } = useSelector((state) => state.user);
  //const { rides } = useSelector((state) => state.rides);
  const { loggedInUser } = useSelector((state) => state.user);

  const [profileUser, setProfileUser] = useState(null);
  const [userRides, setUserRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // find the user by id
  //const profileUser = users.find((u) => u.id === parseInt(id));

  useEffect(() => {
    const fetchData = async () => {
      const user = await api.getUserById(id);
      console.log("user from API:", user); //debuging
      setProfileUser(user);

      const rides = await api.getRides();

      const filteredRides = rides.filter((r) => r.driver?._id === id);
      setUserRides(filteredRides);

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDelete = async (rideId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ride?"
    );
    if (confirm) {
      //dispatch(deleteRide(rideId));
      const result = await api.deleteRide(rideId);

      if (result.message === "Ride deleted") {
        setUserRides(userRides.filter((r) => r._id !== rideId));
      }
    }
  };

  if (loading)
    return (
      <div className="profile-page">
        <p>Loading...</p>
      </div>
    );

  // if user not found
  if (!profileUser || profileUser.message === "User not found") {
    return (
      <div className="profile-page">
        <p>User not found.</p>
        <button onClick={() => navigate("/rides")}>Back to Rides</button>
      </div>
    );
  }

  // get all rides posted by this user
  //const userRides = rides.filter((r) => r.postedBy === profileUser.id);

  const isOwnProfile = loggedInUser?.id === id;

  return (
    <div className="profile-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Profile card */}
      <div className="profile-card">
        {/* Avatar */}
        <div className="profile-avatar">
          {profileUser.username.charAt(0).toUpperCase()}
        </div>

        <h2 className="profile-name">{profileUser.username}</h2>

        <div className="profile-info">
          <div className="profile-info-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{profileUser.email}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Phone</span>
            <span className="profile-value">{profileUser.phone}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Rides Posted</span>
            <span className="profile-value">{userRides.length}</span>
          </div>
          {loggedInUser?.id === profileUser.id && (
            <button
              className="cp-btn"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
          )}
        </div>
      </div>

      {/* User's posted rides */}
      <div className="profile-rides">
        <h3 className="profile-rides-title">Rides by {profileUser.username}</h3>

        {userRides.length > 0 ? (
          <div className="rides-grid">
            {userRides.map((ride) => (
              <div key={ride._id} className="ride-card-wrapper">
                <RideCard ride={ride} />
                {/* only show delete if viewing own profile */}
                {isOwnProfile && (
                  <button
                    className="btn-delete-ride"
                    onClick={() => handleDelete(ride._id)}
                  >
                    🗑 Delete Ride
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="profile-empty">
            This user has not posted any rides yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
