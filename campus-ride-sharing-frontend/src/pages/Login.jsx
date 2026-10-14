import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { login, logout } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Login.css";

import carImage from "../assets/images/1.png";
import logoImage from "../assets/images/logo.png";

import { NavLink } from "react-router-dom";

import { api } from "../api";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useSelector((state) => state.user);

  //to store the user login details
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  //for the error during login like inavlid credentials etc
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all the fields!");
      return;
    }

    const result = await api.login({
      email: formData.email,
      password: formData.password
    });
    if (result.token) {
      localStorage.setItem("token", result.token);
      dispatch(login(result.user));
      navigate("/");
    } else {
      setFormError(result.message || "Invalid email or password.");
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
          <h1 className="login-title">WELCOME!</h1>

          <form onSubmit={handleSubmit} className="login-form">
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formError && <p className="error-msg">{formError}</p>}

            <button type="submit" className="btn-login">
              Log in
            </button>

            <button
              type="button"
              className="btn-create"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

            <p className="account-msg">Don't Have an Account?</p>

            <p className="account-msg">www.uniride.com</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
