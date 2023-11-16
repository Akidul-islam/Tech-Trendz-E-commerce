import {} from 'prop-types';
import HomeNavber from '../Components/navigation/HomeNavbar';
import { Outlet } from 'react-router-dom';
import useFetchProduct from '../hook/useFetchProduct';
import Loader from '../Components/common/Loader';
import { useTypeSelector } from '../Redux/Store';
const HomeLayout = () => {
  useFetchProduct('Products');
  const isLoading = useTypeSelector((state) => state.modal.isLoading);
  return (
    <div className='relative'>
      <HomeNavber />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {' '}
          <Outlet />
        </div>
      )}
      {/* <Loader /> */}
    </div>
  );
};

HomeLayout.propTypes = {};

export default HomeLayout;
