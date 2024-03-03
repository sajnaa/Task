// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './components/features/OptionsSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    // other reducers...
  },
});
