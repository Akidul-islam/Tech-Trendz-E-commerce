import {} from 'prop-types';
import HomeNavber from '../Components/navigation/HomeNavbar';
import { Outlet } from 'react-router-dom';
import useFetchProduct from '../hook/useFetchProduct';

const HomeLayout = () => {
  const products = useFetchProduct('Products');
  console.log(products);
  return (
    <div>
      <HomeNavber />
      <Outlet />
    </div>
  );
};

HomeLayout.propTypes = {};

export default HomeLayout;
