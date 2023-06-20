import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    appUser: null,
    isLoggedIn: false,
  },
  reducers: {
    setUserslist(state, action) {
      state.usersList = action.payload;
    },
    setAppUser(state, action) {
      state.appUser = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    }
  }
});

export const { setUserslist, setAppUser, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
