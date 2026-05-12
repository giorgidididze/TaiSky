import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  orders: [],
  selectedOrder: null,
  address: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

    // =====================
    // SINGLE ORDER
    // =====================
    setOrder: (state, action) => {
      state.order = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    viewOrder: (state, action) => {
      state.selectedOrder = state.orders.find(
        (o) => o.id === action.payload
      );
    },

    clearOrders: (state) => {
      state.orders = [];
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload && order.id !== action.payload
      );
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;

      const order = state.orders.find(
        (o) => o._id === id || o.id === id
      );

      if (order) {
        order.status = status;
      }
    },

    // =====================
    // LOADING + ERROR
    // =====================
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // =====================
    // ADDRESS
    // =====================

    setAddress: (state, action) => {
      state.address = action.payload;
    },

    updateAddress: (state, action) => {
      state.address = {
        ...state.address,
        ...action.payload,
      };
    },

    clearAddress: (state) => {
      state.address = null;
    },
  },
});

export const {
  setOrder,
  clearOrder,
  setOrders,
  addOrder,
  deleteOrder,
  updateOrderStatus,
  setLoading,
  setError,
  viewOrder,
  clearError,
  setAddress,
  updateAddress,
  clearAddress,
} = orderSlice.actions;

export default orderSlice.reducer;