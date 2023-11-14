import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import BestSellingPage from './Pages/BestSellingPage';
import EventsPage from './Pages/EventsPage';
import FaqPage from './Pages/FaqPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import ProfilePage from './Pages/ProfilePage';
import MessagePage from './Pages/MessagePage';

// seller pages
import SellerSignUpPage from './Pages/SellerSignUpPage';
import SellerLoginPage from './Pages/SellerLoginPage';
import SellerProfilePage from './Pages/SellerProfilePage';

// dashboard pages
import DashboardPage from './Pages/DashboardPage';
import AllCouponCodesPage from './Pages/AllCouponCodesPage';
import AllEventsPage from './Pages/AllEventsPage';
import AllProductPage from './Pages/AllProductPage';
import AllOrderPage from './Pages/AllOrderPage';
import SellerProfileSettings from './Pages/SellerProfileSettings';
import SellerMessagePage from './Pages/SellerMessagePage';
import CreateProductPage from './Pages/CreateProductPage';
import CreateEventPage from './Pages/CreateEventPage';
import WithdrawMoneyPage from './Pages/WithdrawMoneyPage';

// checkout pages
import CheckoutPage from './Pages/CheckoutPage';
import PaymentPage from './Pages/PaymentPage';
import OrderSuccessPage from './Pages/OrderSuccessPage';

// order details pages
import OrderDetailsPage from './Pages/OrderDetailsPage';
import SellerOrderDetailsPage from './Pages/SellerOrderDetailsPage';
import TrackOrderPage from './Pages/TrackOrderPage';

// forget password
import ForgetPasswordPage from './Pages/ForgetPasswordPage';
import SellerForgetPasswordPage from './Pages/SellerForgetPasswordPage';

// PrivateRoutes

// page list
import {
  NotDashboard,
  Overview,
  ProductUpload,
  RevenuByPeriod,
  SellerGrid,
  SellerList,
  SellerTable,
  ProductManagement,
} from './Pages/admin/indexPage';
import PrivateRoutes from './Components/common/PrivateRoute';
// layout
import DashboardLayout from './layout/DashboardLayout';
import HomeLayout from './layout/HomeLayout';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <SignUpPage />,
      },
      {
        path: 'forget-password',
        element: <ForgetPasswordPage />,
      },
    ],
  },

  {
    path: '/dashboard',
    element: (
      <PrivateRoutes allow={['admin']}>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: '',
        element: <Overview />,
      },
      {
        element: <SellerList />,
        path: 'seller-list',
      },
      {
        element: <SellerTable />,
        path: 'seller-table',
      },
      {
        element: <SellerGrid />,
        path: 'seller-grid',
      },
      {
        element: <RevenuByPeriod />,
        path: 'revenue-period',
      },
      {
        element: <NotDashboard />,
        path: '*',
      },
      {
        element: <ProductUpload />,
        path: 'product-upload',
      },
      {
        element: <ProductManagement />,
        path: 'product-management',
      },
    ],
  },
]);
