import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    isOpen: false,
    isTitle: 'Dashborad',
    isSubTitle: 'Sales Analytics',
    currentPath: 'Overviews',
    hoverItem: [],
  },
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    activeAction: (state, { payload }) => {
      state.currentPath = payload;
    },
    linkActive: (state, { payload }) => {
      state.isTitle = payload;
      state.currentPath = payload;
    },
    subLinkActive: (state, { payload }) => {
      state.isSubTitle = payload;
      state.currentPath = payload;
    },
  },
});

export const { toggleMenu, activeAction, linkActive, subLinkActive } =
  navigationSlice.actions;
export const getNavState = (state) => state.navigation;
export default navigationSlice.reducer;
