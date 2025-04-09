import { configureStore } from '@reduxjs/toolkit';
import hl7FormReducer from './hl7FormSlice';

export const store = configureStore({
  reducer: {
    hl7Form: hl7FormReducer
  }
}); 