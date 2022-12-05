import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSucces: (state, action) => {
      state.error = false;
      state.isFetching = false;
      state.currentUser = action.payload;
      window.location.reload();
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.errorMessage = "";
    },
  },
});

export const { loginStart, loginSucces, loginFailure, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
