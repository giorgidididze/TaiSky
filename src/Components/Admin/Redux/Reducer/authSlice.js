import { createSlice } from "@reduxjs/toolkit";

// 🔥 SAFE INIT
const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // 🔥 REGISTER
    registerUser: (state, action) => {
      const exists = state.users.find(
        u => u.email === action.payload.email
      );

      if (!exists) {
        // 🔥 default role = user
        const newUser = {
          ...action.payload,
          role: action.payload.role || "user"
        };

        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    // 🔥 LOGIN (FIXED)
    loginUser: (state, action) => {

      console.log("ALL USERS:", state.users);
      console.log("LOGIN TRY:", action.payload);

      const user = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      console.log("FOUND USER:", user);

      if (user) {
        state.currentUser = user;
        state.isAuth = true;

        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("❌ Login failed");
      }
    },

    // 🔥 LOGOUT
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuth = false;

      localStorage.removeItem("user");
    },

    // 🔥 RESET PASSWORD
    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;

      const user = state.users.find(u => u.email === email);

      if (user) {
        user.password = newPassword;
        user.resetToken = null;

        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    // 🔥 FORGOT PASSWORD
    forgotPassword: (state, action) => {
      const { email, resetToken } = action.payload;

      const user = state.users.find(u => u.email === email);

      if (user) {
        user.resetToken = resetToken;

        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    // 🔥 DELETE USER
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        u => u.id !== action.payload
      );

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    // 🔥 ACTIVATE USER
    activateUser: (state, action) => {
      const user = state.users.find(
        u => u.activationToken === action.payload
      );

      if (user) {
        user.isActive = true;
        user.activationToken = null;

        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  deleteUser,
  activateUser
} = authSlice.actions;

export default authSlice.reducer;