// import { useEffect, useState } from 'react';
import styles from '../../Styles/Style';
import { array, string } from 'prop-types';
import useFetchProduct from '../../hook/useFetchProduct';
import ProductCard from './ProductCard';
import { productSdk } from '../../service/api/product';
import { PRODUCTS } from '../../service/api/model';
const ProductList = ({ title, query }) => {
  const { isLoading, products } = useFetchProduct({
    model: PRODUCTS,
    query,
    handler: productSdk.getProducts,
  });
  if (!products) return;
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>{title}</h1>
      </div>
      <div
        className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0 ${
          isLoading && 'blur-sm'
        }`}
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product.product_id} {...product} />
          ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  title: string.isRequired,
  query: array,
};

export default ProductList;
