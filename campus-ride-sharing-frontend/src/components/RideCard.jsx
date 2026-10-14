import { useNavigate } from "react-router-dom";
import "../styles/RideCard.css";

function RideCard({ ride }) {
  const navigate = useNavigate();

  return (
    <div className="ride-card" onClick={() => navigate(`/rides/${ride._id}`)}>
      <div className="card-header">
        <p className="posted-by">
          Posted by <strong>{ride.driverName}</strong>
        </p>
      </div>

      <span className={`ride-type-tag ${ride.type}`}>
        {ride.type === "offering" ? "Offering Ride" : "Requesting Ride"}
      </span>

      <div className="card-row">
        <span>📅 {ride.date}</span>
        <span>🕐 {ride.time}</span>
      </div>

      <div className="card-row">
        <span>📍 {ride.pickup}</span>
        <span className="arrow">→</span>
        <span>{ride.destination}</span>
      </div>

      <div className="card-row">
        <span>
          {ride.type === "offering"
            ? `👥 ${ride.seats} seats available`
            : `👤 ${ride.seats} passengers`}
        </span>
      </div>

      <div className="card-actions">
        <a
          href={`https://wa.me/${ride.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp"
        >
          WhatsApp 💬
        </a>
        <a href={`tel:${ride.phone}`} className="btn-call">
          Call 📞
        </a>
      </div>
    </div>
  );
}

export default RideCard;
