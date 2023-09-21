import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import { Navigate, Outlet } from "react-router-dom"
const ProtectRoute = ({ children, redireact = '/unauthorized' }) => {
    const user = useSelector(state => state.auth.user)

    // if (!user || user.role !== 'admin') return <Navigate to={'/unauthorized'} replace />
    const ad = 'admin'
    // user && user.roles
    return ad === 'admin' ? children ? children : <Outlet /> : <Navigate to={redireact} replace />
}
// user?.role === 'admin'
ProtectRoute.propTypes = {
    children: PropTypes.any,
    redireact: PropTypes.string
}

export default ProtectRoute
