import { useEffect } from 'react';
import { useTypeDispatch } from '../Redux/Store';
import { fetchProducts } from '../Redux/features/cart';

const useFetchProduct = () => {
  const dispatch = useTypeDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return;
};

export default useFetchProduct;
