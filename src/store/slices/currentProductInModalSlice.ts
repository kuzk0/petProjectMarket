import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { initialStateCurrentProductInModal } from "../inititalState";
import { IProduct } from "../../consts";

export const currentProductInModalSlice = createSlice({
  name: "currentProductInModal",
  initialState: initialStateCurrentProductInModal,
  reducers: {
    set(state, action: PayloadAction<IProduct>) {
      state.product = action.payload;
    },
  },
});

export const { set } = currentProductInModalSlice.actions;

export default currentProductInModalSlice.reducer;
