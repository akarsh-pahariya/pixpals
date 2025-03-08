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
  },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
