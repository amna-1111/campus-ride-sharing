import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import logoImage from "../assets/images/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // for hamburger toggle
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false); // close menu on logout
  };

  // close menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  console.log("loggedInUser:", loggedInUser);
  console.log("token:", localStorage.getItem("token"));

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <NavLink to="/" onClick={handleLinkClick}>
          <img src={logoImage} alt="UniRide" />
        </NavLink>
      </div>

      {/* Links — hidden on mobile unless menuOpen */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>

        {/* only when logged in */}
        {loggedInUser ? (
          <>
            <li>
              <NavLink to="/my-bookings" onClick={handleLinkClick}>
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile/${loggedInUser.id}`}
                onClick={handleLinkClick}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* only when NOT logged in */}
            <li>
              <NavLink to="/login" onClick={handleLinkClick}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={handleLinkClick}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
