import AsideNavigation from '../Components/common/AsideNavigation';
import TopNavigation from '../Components/TopNavigation';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import MouseHoverItem from "./mouseHoverItem"

const DashboardLayout = () => {
  const isOpen = useSelector((state) => state.navigation.isOpen);

  return (
    <div className='  overflow-x-hidden'>
      <TopNavigation />
      <AsideNavigation />
      {/* main */}
      <main
        className={` mt-[62px]  md:duration-300 md:ease-linear ${
          isOpen
            ? 'md:inactive-size md:ml-[80px]'
            : 'md:size-of-width md:ml-[300px]'
        }`}
      >
        <Outlet />
      </main>
      {/* <MouseHoverItem items={[1, 4]} /> */}
    </div>
  );
};
export default DashboardLayout;
