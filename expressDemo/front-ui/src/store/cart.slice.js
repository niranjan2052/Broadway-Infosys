import { createSlice } from "@reduxjs/toolkit";
import { fromStorage } from "@/lib";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: JSON.parse(fromStorage("cart") || "{}"),
  },
  reducers: {
    setCart: (state, action) => {
      state.value = action.payload;
    },
    clearCart: (state) => {
      state.value = {};
    },
  },
});

export default cartSlice.reducer;

export const { setCart, clearCart } = cartSlice.actions;
