import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ICartItem, ICartState, IProduct } from "../../consts";
import { setUserCart } from "../../utils/db";
import { initialStatCart } from "../inititalState";
const updateCartHandle = (cart: ICartItem[]) => {
  setUserCart(cart).catch((error) => {
    console.log(error);
  });
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStatCart,
  reducers: {
    addItem(state, action: PayloadAction<IProduct>) {
      if (!state.cartList.find((cartItem) => cartItem.product.id === action.payload.id)) {
        state.cartList.push({
          product: action.payload,
          count: 1,
        });
        state.countCartItem++;
        updateCartHandle(state.cartList)
      }
    },
    changeCount(state, action: PayloadAction<ICartItem>) {
      state.cartList[state.cartList.findIndex((cartItem) => cartItem.product.id === action.payload.product.id)].count =
        action.payload.count < 0 ? 0 : action.payload.count;
        updateCartHandle(state.cartList)
    },
    deleteItem(state, action: PayloadAction<IProduct>) {
      if (
        state.cartList.splice(
          state.cartList.findIndex((cartItem) => cartItem.product.id === action.payload.id),
          1
        )
      )
        state.countCartItem--;
        updateCartHandle(state.cartList)
    },
    clearCart(state) {
      state.cartList = [];
      state.countCartItem = 0;
      updateCartHandle(state.cartList)
    },
    updateCart(state, action: PayloadAction<ICartState>) {
      state.cartList = action.payload.cartList;
      state.countCartItem = action.payload.countCartItem;
      updateCartHandle(state.cartList)
    },
  },
});

export const { addItem, changeCount, deleteItem, clearCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
