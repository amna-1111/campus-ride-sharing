import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import "../styles/ChangePassword.css";

import { api } from "../api";

function ChangePassword() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { loggedInUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // check current password is correct
    // if (formData.currentPassword !== loggedInUser.password) {
    //   setError("Current password is incorrect.");
    //   return;
    // }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    // dispatch(
    //   changePassword({
    //     email: loggedInUser.email,
    //     newPassword: formData.newPassword
    //   })
    // );

    // setSuccess("Password changed successfully!");
    // setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const result = await api.changePassword({
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });

    if (result.message === "Password changed successfully") {
      setSuccess("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } else {
      setError(result.message || "Something went wrong.");
    }
  };

  return (
    <div className="change-password-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="change-password-card">
        <h1 className="change-password-title">Change Password</h1>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="cp-input">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>

          <div className="cp-input">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <div className="cp-input">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="cp-error">{error}</p>}
          {success && <p className="cp-success">{success}</p>}

          <button type="submit" className="cp-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
