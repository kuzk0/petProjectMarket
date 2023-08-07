import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { initialStateFilterPrice } from "../inititalState";

export const filterPriceSlice = createSlice({
  name: "filterPrice",
  initialState: initialStateFilterPrice,
  reducers: {
    setMin(state, action: PayloadAction<number>) {
      state.min = action.payload;
    },
    setMax(state, action: PayloadAction<number>) {
      state.max = action.payload;
    },
    setFromTo(state, action: PayloadAction<number[]>) {
      state.default = action.payload;
    },
  },
});

export const { setMin, setMax, setFromTo } = filterPriceSlice.actions;

export default filterPriceSlice.reducer;
