const BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = {
  // Auth
  register: (data) =>
    fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((r) => r.json()),

  login: (data) =>
    fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((r) => r.json()),

  changePassword: (data) =>
    fetch(`${BASE}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    }).then((r) => r.json()),

  // Rides
  getRides: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return fetch(`${BASE}/rides`).then((r) => r.json());
  },

  getRideById: (id) => fetch(`${BASE}/rides/${id}`).then((r) => r.json()),

  postRide: (data) =>
    fetch(`${BASE}/rides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    }).then((r) => r.json()),

  // Bookings
  bookRide: (rideId) =>
    fetch(`${BASE}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ rideId })
    }).then((r) => r.json()),

  getMyBookings: () =>
    fetch(`${BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then((r) => r.json()),

  getUserById: (id) => fetch(`${BASE}/auth/user/${id}`).then((r) => r.json()),

  deleteRide: (rideId) =>
    fetch(`${BASE}/rides/${rideId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then((r) => r.json())
};
