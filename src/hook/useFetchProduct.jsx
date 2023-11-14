import { useEffect, useState } from 'react';
import firebaseConfig from '../../firebase.config';
import { collection, onSnapshot, query } from 'firebase/firestore';

const useFetchProduct = (model) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let unsubscribe;
    const fetchData = async () => {
      try {
        const q = query(collection(firebaseConfig.database, model));
        unsubscribe = onSnapshot(q, (query) => {
          let productList = [];
          query.forEach((product) => {
            productList.push({ ...product.data(), product_id: product.id });
          });
          setProducts(productList);
        });
        // return unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => unsubscribe();
  }, [model]);
  return products;
};

export default useFetchProduct;
