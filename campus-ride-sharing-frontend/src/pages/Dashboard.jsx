import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="hero-title">
        <h1>Share Rides</h1>
        <h1>Build a Community.</h1>
      </div>

      <div className="hero-msg">
        Connect with your community, save on travel costs, and reduce your
        carbon footprint.
      </div>

      <div className="hero-buttons">
        <button className="post-btn" onClick={() => navigate("/post-ride")}>
          Post a Ride →
        </button>
        <button className="browse-btn" onClick={() => navigate("/rides")}>
          Browse Rides
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
