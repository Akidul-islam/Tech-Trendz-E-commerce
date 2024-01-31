const ProductDetailsPage = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl p-8 bg-white shadow-md rounded-md'>
        {/* Product Image */}
        <div className='mb-8'>
          <img
            src='https://via.placeholder.com/400x400'
            alt='Product'
            className='w-full h-64 object-cover rounded-md'
          />
        </div>

        {/* Product Information */}
        <div>
          <h2 className='text-3xl font-semibold mb-4'>Product Name</h2>
          <p className='text-gray-600 mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio.
          </p>

          {/* Price and Add to Cart */}
          <div className='flex items-center justify-between mb-4'>
            <span className='text-2xl font-bold text-indigo-600'>$99.99</span>
            <button className='px-4 py-2 bg-indigo-600 text-white rounded-md'>
              Add to Cart
            </button>
          </div>

          {/* Product Details */}
          <div>
            <h3 className='text-xl font-semibold mb-2'>Product Details</h3>
            <p className='text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
