import { useSelector } from 'react-redux';
import { array, string, node } from 'prop-types';
import { Navigate } from 'react-router-dom';
const PrivateRoutes = ({
  children,
  redireact = '/unauthorized',
  allow = [],
}) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to={'/login'} replace />;
  return allow.includes(user.roles) ? (
    children
  ) : (
    <Navigate to={redireact} replace />
  );
};
// user?.role === 'admin'
PrivateRoutes.propTypes = {
  children: node,
  redireact: string,
  allow: array,
};

export default PrivateRoutes;
