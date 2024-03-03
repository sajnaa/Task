
import { createSlice } from '@reduxjs/toolkit';

const OptionsSlice = createSlice({
  name: 'form',
  initialState: {
    associationMode: "oneToOne",
    enable: "Enable",
    lineStyle: "straight",
    mobileClickIt: false,
    whiteSpace: "normal",
  },
  reducers: {
    setFieldValue: (state, action) => {
      console.log(state,action)
      state[action.payload.field] = action.payload.value;
    },
    toggleCheckbox: (state, action) => {
      console.log(state,action)
      state[action.payload.field] = !state[action.payload.field];
    },
  },
});

export const { setFieldValue, toggleCheckbox } = OptionsSlice.actions;
export const selectForm = (state) => state.form;
export default OptionsSlice.reducer;
