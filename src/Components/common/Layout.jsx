import PropTypes from "prop-types"
const Layout = ({ children }) => {
    return (
        <div className="px-[0.8rem] py-[24px] 400px:p-[26px]">
            <nav>navber</nav>
            <aside>asidebar</aside>
            <main>{children}</main>
            <footer>footer</footer>
        </div>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired
}
export default Layout
