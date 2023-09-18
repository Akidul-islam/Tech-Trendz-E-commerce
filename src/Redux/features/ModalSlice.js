import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAlertOpen: false,
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    alertClose: (state) => {
      state.isAlertOpen = false;
    },
    alertOpen: (state) => {
      state.isAlertOpen = true;
    },
  },
});
export default modalSlice.reducer;
