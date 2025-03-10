import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupsList: [],
  },
  reducers: {
    addGroupList: (state, action) => {
      state.groupsList = action.payload;
    },
    clearGroupList: (state) => {
      state.groupsList = [];
    },
  },
});

export const { addGroupList, clearGroupList } = groupSlice.actions;
export default groupSlice.reducer;
