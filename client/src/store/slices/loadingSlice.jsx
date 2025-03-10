import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: true,
  },
  reducers: {
    setIsLoadingToTrue: (state) => {
      state.isLoading = true;
    },
    setIsLoadingToFalse: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setIsLoadingToFalse, setIsLoadingToTrue } = loadingSlice.actions;
export default loadingSlice.reducer;
