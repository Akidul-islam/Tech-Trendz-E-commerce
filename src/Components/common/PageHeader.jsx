import { HiRefresh } from '../../Static/Icon';
import { useSelector } from 'react-redux';

const PageHeader = () => {
  const currentPath = useSelector((state) => state.navigation.currentPath);
  return (
    <div className='py-4 px-2 shadow-lg mt-2 flex bg-white  items-center '>
      <h1 className='font-Roboto font-medium text-2xl text-h5'>
        {currentPath}
      </h1>
      <div className=' ml-auto flex gap-2 items-center'>
        <h6 className='font-Roboto  text-gray-900 text-sm flex items-center gap-3 '>
          <span className='font-medium'>Data Refress</span>
          <span>
            {' '}
            <HiRefresh />
          </span>
        </h6>
        <p className='border p-1 rounded-sm text-sm font-medium'>
          {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
