import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getError, loadStart, loadStop } from './ModalSlice';
// import axios from 'axios';

const initialState = {
  products: [],
  cartItems: [],
  amount: 4,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  'cart/products',
  async (query, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loadStart());
      // const products = await firebaseConfig.getProducts('Products', query);
      dispatch(loadStop());
    } catch (error) {
      dispatch(loadStop());
      dispatch(getError(error));
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    getProducts: (state, { payload }) => {
      state.products = payload;
      console.log(payload);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },

    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchProducts.fulfilled, (state, action) => {
  //     state.products = action.payload;
  //   });
  // },
});

// console.log(cartSlice);
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  getProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
