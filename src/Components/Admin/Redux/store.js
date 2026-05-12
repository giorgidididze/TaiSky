import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./Reducer/productSlice";
import authSlice from "./Reducer/authSlice";
import cartSlice from "./Reducer/cartSlice";
import orderSlice from "./Reducer/orderSlice";
import dashboardReducer from "./Reducer/dashboardSlice";

import { loadState, saveState } from "../../Utils/localStorage";

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    dashboard: dashboardReducer,
  },

  preloadedState: {
    cart: loadState("cart") || {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    },
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveState("cart", state.cart);
  saveState("auth", {
    currentUser: state.auth.currentUser,
    isAuth: state.auth.isAuth,
  });

  saveState("products", state.product);
});

export default store;