import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: null,
    authChecked: false,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
  },
});

export const { addUserInfo, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
