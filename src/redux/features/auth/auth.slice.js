import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      //   state.user = user;
      state.user = user ?? null;

      if (token) state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;

export const currentUserToken = (state) => state.auth.token;
export const currentUser = (state) => state.auth.user;

export default authSlice.reducer;
