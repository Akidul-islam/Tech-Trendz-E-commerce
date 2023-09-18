import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
const url = 'https://course-api.com/react-useReducer-cart-project';

// import axios from 'axios';

const initialState = {
  cart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i.id === item.id);
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) => (i.id === isItemExist.id ? item : i)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) => i.id !== action.payload),
    };
  },
});

const initialStat = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStat,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
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
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

// export default cartSlice.reducer;
