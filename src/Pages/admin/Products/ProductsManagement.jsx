import { useEffect, useState } from 'react';
import PageHeader from '../../../Components/common/PageHeader';
import Select, { Option } from '../../../Components/common/Select';
import { Typography } from '@material-tailwind/react';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { optionData } from '../../../Static/data';
import ProductTable from '../../../Components/common/ProductTable';

const ProductsManagement = () => {
  const [query, setQuery] = useState({});
  const onChange = (name, text) => setQuery({ ...query, [name]: text });

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <section className='h-screen'>
      <PageHeader />
      <div className='mt-6 flex  gap-x-6  px-2'>
        <div className='flex gap-x-4 flex-wrap'>
          {optionData.map((opt) => (
            <div key={opt.title} className='w-[10rem]'>
              <Select
                key={opt.title}
                name={opt.title}
                title={opt.title}
                onChange={onChange}
              >
                {opt.option?.map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </div>
          ))}
        </div>
        <div className='ml-auto'>
          <button className='px-2 w-[8rem] py-2 border-none bg-teal-900 text-sm outline-none font-medium text-white border-gray-900/80 duration-200 hover:shadow rounded'>
            Apply
          </button>
          <button className='px-2 w-[8rem] py-2 outline-none   ml-6 text-sm font-medium border duration-200 hover:shadow border-gray-900 rounded'>
            Cancel
          </button>
        </div>
      </div>
      <div className='mt-4 flex px-2'>
        <Typography className='font-Roboto font-medium text-h5/80 opacity-70 text-sm'>
          View Product: 8/20
        </Typography>
        <div className='ml-auto  flex items-center bg-white border px-2 py-1 rounded-md duration-100 ease-in hover:border-teal-800/70'>
          <input
            type='text'
            className=' bg-none outline-none font-medium text-sm opacity-80 rounded'
            placeholder='search product'
          />
          <span className='text-teal-700 font-Roboto text-2xl cursor-pointer'>
            <IoSearchCircleOutline />
          </span>
        </div>
      </div>
      <ProductTable />
    </section>
  );
};

export default ProductsManagement;
