import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './Cart';
import { wishlistReducer } from './Wishlist';
import AuthReducer from './features/Auth';
import ModalReducer from './features/ModalSlice';
import productFormReducer from './features/ProductFormSlice';

const Store = configureStore({
  reducer: {
    modal: ModalReducer,
    auth: AuthReducer,
    productForm: productFormReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default Store;
