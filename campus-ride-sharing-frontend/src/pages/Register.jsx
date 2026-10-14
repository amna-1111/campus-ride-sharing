import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//import { registerUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Login.css";

import carImage from "../assets/images/1.png";
import logoImage from "../assets/images/logo.png";

import { NavLink } from "react-router-dom";

import { api } from "../api";

function Register() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  //to store the user login details
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  //for the error during login like inavlid credentials etc
  const [formError, setFormError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormError("Please fill in all the fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match!");
      return;
    }

    if (formData.phone.length !== 11) {
      setFormError("Phone number must be 11 digits.");
      return;
    }

    if (isNaN(formData.phone)) {
      setFormError("Phone number must contain only numbers.");
      return;
    }

    if (formData.password.length < 4) {
      setFormError("Password must be at least 4 characters.");
      return;
    }

    const result = await api.register({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    console.log(result);

    if (result.message === "Registered successfully!") {
      setSuccessMsg("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setFormError(result.message || "Registration failed.");
    }
  };

  return (
    <div className="login-page">
      {/*car on one side*/}
      <div className="login-left">
        <img src={carImage} alt="" />
      </div>

      {/*login details on the other*/}
      <div className="login-right">
        <div className="login-card">
          <div className="login-logo">
            <NavLink to="/">
              <img src={logoImage} alt="logo" />
            </NavLink>
          </div>
          <h1 className="login-title">Create new Account</h1>

          <p className="account-msg login-link">
            Already registered? <Link to="/login">Log in here.</Link>
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input">
              <label>Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="login-input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="login-input">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="login-input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="login-input">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {formError && <p className="error-msg">{formError}</p>}

            {successMsg && <p className="success-msg">{successMsg}</p>}

            <button type="submit" className="btn-login">
              Sign Up
            </button>

            <p className="account-msg">www.uniride.com</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
