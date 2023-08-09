import { configureStore } from "@reduxjs/toolkit";
import sort from "./slices/sortProductSlice";
import filterPrice from "./slices/filterPriceProductSlice";
import cart from "./slices/cartSlice";
import currentProductInModal from "./slices/currentProductInModalSlice";
import loginUser from "./slices/userSlice";
import pagination from "./slices/paginationSlice";

export const store = configureStore({
  reducer: { sort, filterPrice, cart, currentProductInModal, loginUser, pagination },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
