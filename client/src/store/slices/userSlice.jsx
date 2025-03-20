import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { addUserInfo, removeUserInfo } = userSlice.actions;
export default userSlice.reducer;
