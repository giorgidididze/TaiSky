import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const getPrice = (item) => item.Price ?? item.price ?? 0;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        item => item._id === newItem._id
      );

      const price = getPrice(newItem);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1
        });
      } else {
        existingItem.quantity += 1;
      }

      state.totalQuantity += 1;
      state.totalPrice += price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find(
        item => item._id === id
      );

      if (!existingItem) return;

      const price = getPrice(existingItem);

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= price * existingItem.quantity;

      state.items = state.items.filter(
        item => item._id !== id
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    setCart: (state, action) => {
      state.items = action.payload;

      state.totalQuantity = action.payload.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      state.totalPrice = action.payload.reduce(
        (sum, item) => {
          const price = item.Price ?? item.price ?? 0;
          return sum + price * (item.quantity || 1);
        },
        0
      );
    }

  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;