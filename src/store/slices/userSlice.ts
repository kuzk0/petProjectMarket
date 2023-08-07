import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { initialStateLoginUser } from "../inititalState";
import { IUserLoginState } from "../../consts";

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: initialStateLoginUser,
  reducers: {
    login(state, action: PayloadAction<IUserLoginState>) {
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.status = action.payload.status;
      state.auth = action.payload.auth;
    },
    signOut(state) {
      state.name = "";
      state.uid = "";
      state.status = "user";
      state.auth = false;
    },
  },
});

export const { login, signOut } = loginUserSlice.actions;

export default loginUserSlice.reducer;
