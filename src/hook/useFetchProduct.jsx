import { any, func, string } from 'prop-types';
import { useEffect, useState } from 'react';
const useFetchProduct = ({ model, query, handler }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productList = await handler(model, query);
        if (isMounted) {
          setProducts(productList);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
        }
      }
    };
    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [handler, model, query]);
  return { isLoading, products, isError };
};

useFetchProduct.propTypes = {
  model: string.isRequired,
  query: any,
  handler: func.isRequired,
};

export default useFetchProduct;
