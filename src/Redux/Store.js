import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './Cart';
import { wishlistReducer } from './Wishlist';
import AuthReducer from './features/Auth';
import ModalReducer from './features/ModalSlice';
import productFormReducer from './features/ProductFormSlice';
import NavigationReducer from './features/Navigation';
import { useDispatch, useSelector } from 'react-redux';

const Store = configureStore({
  reducer: {
    navigation: NavigationReducer,
    modal: ModalReducer,
    auth: AuthReducer,
    productForm: productFormReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: true,
});
export const useTypeSelector = useSelector;
export const useTypeDispatch = () => useDispatch();
export default Store;
