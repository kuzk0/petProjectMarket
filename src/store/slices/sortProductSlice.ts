import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { initialStateSort } from "../inititalState";

export const sortSlice = createSlice({
  name: "sort",
  initialState: initialStateSort,
  reducers: {
    setSort(state, action: PayloadAction<number>) {
      state.sortID = action.payload;
    },
    clearSort(state) {
      state.sortID = 0;
    },
  },
});

export const { setSort, clearSort } = sortSlice.actions;

export default sortSlice.reducer;
