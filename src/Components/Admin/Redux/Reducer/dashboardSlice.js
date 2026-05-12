import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    totalproduct: 0,
    totalorder: 0,
    orderdeliver: 0,
    totaluser: 0,
  },
  username: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    calculateDashboard: (state, action) => {
      const { products, orders, users } = action.payload;

      state.stats.totalproduct = products.length;
      state.stats.totalorder = orders.length;
      state.stats.totaluser = users.length;

      // delivered orders
      state.stats.orderdeliver = orders.filter(
        (o) => o.status === "Delivered"
      ).length;
    },

    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { calculateDashboard, setUsername } = dashboardSlice.actions;
export default dashboardSlice.reducer;