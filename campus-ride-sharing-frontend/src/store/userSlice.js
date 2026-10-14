import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    // decode the token payload (it's base64)
    const payload = JSON.parse(atob(token.split(".")[1]));
    // check if token is expired
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return { ...payload, id: payload.id }; // contains id, username, email, phone
  } catch {
    return null;
  }
};

const initialState = {
  users: [], //list of all the users
  loggedInUser: getUserFromStorage() //current user logged in
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // const { email, password } = action.payload;
      // const found = state.users.find(
      //   (user) => user.email === email && user.password === password
      // );

      // if (found) {
      //   state.loggedInUser = found;
      // }

      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("token");
    },
    changePassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const found = state.users.find((user) => user.email === email);

      if (found) {
        found.password = newPassword;
      }
    },
    registerUser: (state, action) => {
      state.users.push(action.payload);
    }
  }
});

export const { login, logout, changePassword, registerUser } =
  userSlice.actions;
export default userSlice.reducer;
