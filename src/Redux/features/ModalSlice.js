import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAlertOpen: false,
  isModalOpen: false,
  isLoading: false,
  error: '',
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
    loadStart: (state) => {
      state.isLoading = true;
    },
    loadStop: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loadStart, loadStop } = modalSlice.actions;
export default modalSlice.reducer;
