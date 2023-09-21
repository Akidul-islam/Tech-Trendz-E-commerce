
import { node } from "prop-types"
import { useState } from "react"
import AsideNavigation from "./AsideNavigation"
import TopNavigation from "../TopNavigation"


const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const openSide = () => setIsOpen(!isOpen)
    return (
        <div className=" relative px-[1rem] py-[24px] 400px:p-[26px] overflow-x-hidden">
            <TopNavigation isOpen={isOpen} openSide={openSide} />
            <AsideNavigation openSide={openSide} isOpen={isOpen} />
            {/* main */}
            <main className="grid place-items-center mt-2">{children}</main>
            <footer>footer</footer>
        </div>
    )
}
Layout.propTypes = {
    children: node.isRequired,
}
export default Layout



