import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { initialStatePagination } from "../inititalState";

export const Pagination = createSlice({
  name: "pagination",
  initialState: initialStatePagination,
  reducers: {
    setProductCurrentPage(state, action: PayloadAction<number>) {
      state.productCurrentPage = action.payload;
    },
    setOrderCurrentPage(state, action: PayloadAction<number>) {
      state.orderCurrentPage = action.payload;
    },

    setProductSortBy(state, action: PayloadAction<number>) {
      state.productSortBy = action.payload;
    },
    setOrderSortBy(state, action: PayloadAction<number>) {
      state.orderSortBy = action.payload;
    },
  },
});

export const { setProductCurrentPage, setOrderCurrentPage, setOrderSortBy, setProductSortBy} = Pagination.actions;

export default Pagination.reducer;
