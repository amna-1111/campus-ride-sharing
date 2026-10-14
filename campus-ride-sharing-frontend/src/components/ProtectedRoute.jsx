import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { loggedInUser } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!loggedInUser && !token) {
    //alert("Login Required!"); //simply just show an alert

    // only alert if user is trying to access, not being redirected after logout
    if (location.key !== "default") {
      alert("Login Required!");
    }

    return <Navigate to="/login" />; // redirect to login if not logged in
  }

  return children; // otherwise show the page
}

export default ProtectedRoute;
