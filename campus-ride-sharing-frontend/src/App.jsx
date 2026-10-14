import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import PostRide from "./pages/PostRide";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import RidesDetails from "./pages/RideDetails";
import AllRides from "./pages/RidesPage";
import UserProfile from "./pages/UserProfile";
import Communities from "./pages/Communities";

function AppContent() {
  const { loggedInUser } = useSelector((state) => state.user);
  const location = useLocation();

  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rides" element={<AllRides />} />
        <Route path="/rides/:id" element={<RidesDetails />} />
        <Route path="/community" element={<Communities />} />

        <Route
          path="/post-ride"
          element={
            <ProtectedRoute>
              <PostRide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
function App() {
  //here we will define our links
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
