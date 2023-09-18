import { createSlice } from '@reduxjs/toolkit';
import { pCategoryList } from '../../Static/data';

const productFormSlice = createSlice({
  name: 'product-form',
  initialState: {
    mainCategory: pCategoryList.mainCategory,
    sub_category: pCategoryList.sub_category[0]['category'],
    displayImg: [],
    variantMeta: {
      isEnable: false,
      isInput: false,
      variantOption: [],
    },
  },
  reducers: {
    enableOption: (state) => {
      state.variantMeta.isEnable = true;
    },
    showInput: (state) => {
      state.variantMeta.isInput = true;
    },
    cancelOption: (state) => {
      state.variantMeta.isInput = false;
    },

    addVariant: (state, { payload }) => {
      const variant = [...state.variantMeta.variantOption];
      const exits = variant.some((i) => i.type === payload.type);
      if (!exits) variant.push({ type: payload.type, value: payload.value });
      state.variantMeta.variantOption = variant;
      state.variantMeta.isInput = false;
    },
    readerUrl: (state) => {
      console.log(state);
    },
    categoryTitle: (state, { payload }) => {
      const item = pCategoryList.sub_category.find((i) => i.title === payload);

      state.sub_category = item.category;
    },
  },
});

export const {
  enableOption,
  showInput,
  cancelOption,
  addVariant,
  categoryTitle,
} = productFormSlice.actions;

export default productFormSlice.reducer;
