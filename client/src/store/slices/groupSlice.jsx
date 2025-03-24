import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupsList: [],
    refreshGroups: true,
  },
  reducers: {
    addGroupList: (state, action) => {
      state.groupsList = action.payload;
      state.refreshGroups = false;
    },
    clearGroupList: (state) => {
      state.groupsList = [];
      state.refreshGroups = true;
    },
    setRefreshGroupsToTrue: (state) => {
      state.refreshGroups = true;
    },
  },
});

export const { addGroupList, clearGroupList, setRefreshGroupsToTrue } =
  groupSlice.actions;
export default groupSlice.reducer;
