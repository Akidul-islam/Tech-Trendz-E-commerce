import { Suspense, lazy, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProduct from '../../hook/useFetchProduct';
import { PRODUCTS } from '../../service/api/model';
import { productSdk } from '../../service/api/product';
import TabBar from '../../Components/common/Tabbar';
const Image = lazy(() => import('../../Components/common/LazyImages'));
const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['Blue', 'Red', 'Green', 'Yellow'];
const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const { id } = useParams();
  const { products } = useFetchProduct({
    model: PRODUCTS,
    query: id,
    handler: productSdk.getProduct,
  });
  const { productName, images, regularPrice } = products;
  return (
    <div className='bg-gray-100  font-sans'>
      <div className=' p-8 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Product Gallery */}
          <div className='mb-8 md:mb-0 grid grid-cols-3 gap-4'>
            {images &&
              images.map((img) => (
                <Suspense key={img} fallback={<h1>laoding</h1>}>
                  <Image
                    alt={'product'}
                    img={img ? img : 'https://via.placeholder.com/800x800'}
                    className='col-span-3 md:col-span-2 w-full h-64 object-cover rounded-md shadow-md'
                  />
                </Suspense>
              ))}
          </div>

          {/* Product Information */}
          <div className='flex flex-col'>
            <h2 className='text-4xl font-extrabold capitalize text-h5 opacity-80 mb-4'>
              {productName}
            </h2>
            <div className='flex items-center mb-4'>
              <span className='text-md font-medium text-gray-700 mr-4'>
                SIZE:
              </span>
              <div className='flex space-x-2'>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 rounded ${
                      selectedSize === size
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } hover:bg-indigo-600 hover:text-white transition duration-300`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center mb-4'>
              <span className='text-md font-medium text-gray-900/80 mr-4'>
                Color:
              </span>
              <div className='flex space-x-2'>
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-none ${
                      selectedColor === color ? 'opacity-90' : 'opacity-50'
                    } transition duration-300`}
                    title={color}
                    style={{ background: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between mb-4'>
              <span className='text-3xl font-semibold text-indigo-600'>
                ${regularPrice}
              </span>
              <button className='px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Product Description Tabs */}
      <div className='flex mt-10 px-4'>
        <div className='flex-1'>
          <TabBar />
        </div>
        <div className='flex-1'>related products</div>
      </div>
    </div>
  );
};

export default ProductDetails;
