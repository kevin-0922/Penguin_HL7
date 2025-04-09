import { createSlice } from '@reduxjs/toolkit';
import formDataInitialState from '../utils/formDataInitialState';

const hl7FormSlice = createSlice({
  name: 'hl7Form',
  initialState: formDataInitialState,
  reducers: {
    updateFormData: (state, action) => {
      const { segment, field, value } = action.payload;
      if (state[segment]) {
        state[segment][field] = value;
      }
    },
    resetForm: () => formDataInitialState
  }
});

export const { updateFormData, resetForm } = hl7FormSlice.actions;
export default hl7FormSlice.reducer; 