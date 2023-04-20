import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk, loadSingleUserThunk } from "./users-thunks";

const usersReducer = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    currentUser: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.loading = false;
      state.users = [];
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: {
    [loadSingleUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [loginThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },
    [signupThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [signupThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },
  },
});
export const { logout } = usersReducer.actions;
export default usersReducer.reducer;
