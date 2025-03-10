import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';
import groupReducer from './slices/groupSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    group: groupReducer,
  },
});

export default appStore;
