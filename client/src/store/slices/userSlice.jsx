import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
