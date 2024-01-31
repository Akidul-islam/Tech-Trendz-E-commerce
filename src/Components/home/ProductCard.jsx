import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import styles from '../../Styles/Style';
import { lazy, Suspense } from 'react';
const LazyImage = lazy(() => import('../common/LazyImages'));
import Image from '../common/LazyImages';
import { Typography } from '@material-tailwind/react';
const ProductCard = ({
  productName,
  regularPrice,
  brand,
  product_id,
  stock,
  images,
  blur,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm w-full h-[330px] relative p-3 cursor-pointer ${
        blur && 'blur-sm'
      }`}
    >
      {/* <div className='flex justify-end'></div> */}

      <Link to={`/product/${product_id}`}>
        <Suspense fallback={<Image />}>
          <LazyImage img={images[0]} alt={productName} />
        </Suspense>
      </Link>
      <Typography className='text-teal-400 opacity-80' variant='h6'>
        {brand}
      </Typography>
      <Link to={`/product/${product_id}`}>
        <h4 className='pb-3 font-[500]'>
          {productName.length > 40
            ? productName.slice(0, 40) + '...'
            : productName}
        </h4>

        <div className='flex select-none'>
          <AiFillStar
            size={20}
            color='#f6Ba00'
            className='mr-2 cursor-pointer'
          />
          <AiFillStar
            size={20}
            color='#f6Ba00'
            className='mr-2 cursor-pointer'
          />
          <AiFillStar
            size={20}
            color='#f6Ba00'
            className='mr-2 cursor-pointer'
          />
          <AiFillStar
            size={20}
            color='#f6Ba00'
            className='mr-2 cursor-pointer'
          />
          <AiOutlineStar
            size={20}
            color='#f6Ba00'
            className='mr-2 cursor-pointer'
          />
        </div>
      </Link>

      <div className='py-2 flex items-center select-none justify-between'>
        <div className='flex'>
          <h5 className={`${styles.productDiscountPrice}`}>
            {/* ${data.price === 0 ? data.price : data.discount_price} */}
            {regularPrice}
          </h5>

          <h4 className={`${styles.price}`}>
            {/* {data.price ? '$' + data.price : null} */}
            {regularPrice}
          </h4>
        </div>
        <span className='font-[400] text-[17px] text-[#68d384]'>
          {stock || 0} sold
        </span>
      </div>

      {/* side panel */}
      <div>
        {/* {click ? (
          <AiFillHeart
            size={22}
            color={click ? 'red' : '#333'}
            // onClick={() => handleWishlistRemoveItem(data)}
            className='absolute cursor-pointer top-8 right-3'
            title='Remove to wishlist'
          />
        ) : (
          <AiOutlineHeart
            size={22}
            color='#333'
            onClick={() => handleWishlistAddItem(data)}
            className='absolute top-8 right-3'
            title='Add to wishlist'
          />
        )} */}
        <AiOutlineHeart
          size={22}
          color='#333'
          //   onClick={() => handleWishlistAddItem(data)}
          className='absolute top-8 right-3'
          title='Add to wishlist'
        />

        <AiOutlineEye
          size={22}
          color='#333'
          className='absolute top-16 right-3 cursor-pointer'
          // onClick={() => setOpen(!open)}
          title='Quick view'
        />

        <Link>
          <AiOutlineShoppingCart
            size={25}
            color='#333'
            className='absolute top-24 right-3 cursor-pointer'
            title='Add to cart'
            // onClick={() => handleAddToCart(data?.id)}
          />
        </Link>

        {/* {open ? <ProductDetailsCart setOpen={setOpen} data={data} /> : null} */}
      </div>

      {/* toast message */}
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </div>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
