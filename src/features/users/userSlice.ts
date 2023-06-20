import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface UserState {
  usersList: IUser[];
    appUser: IUser | null;
    isLoggedIn: boolean;
}

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    appUser: null,
    isLoggedIn: false,
  }as UserState,
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
