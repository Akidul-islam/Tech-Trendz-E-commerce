import { object, string, array, func, bool } from "prop-types"
import { useRef, useState } from "react"
import { FaPersonWalkingArrowRight } from "react-icons/fa6"
import { GoEyeClosed } from "react-icons/go"
import { Link } from "react-router-dom"
import { asideData } from "../../Static/data"
const AsideNavigation = ({ isOpen, openSide }) => {
    const [selected, setIsSelected] = useState({ title: 'Dashborad', subTitle: 'Sales Analytics', isToggle: false })
    const elementRef = useRef(null)
    // menuTogglingh
    const toggling = (title, subTitle) => {
        subTitle ? setIsSelected({ title, subTitle }) : (setIsSelected({ ...selected, title }));
    }

    return <aside id="closeSide" ref={elementRef} className={`fixed z-50 top-0 left-0  h-screen bg-gray-800/80 w-full overflow-hidden duration-500 ease-linear ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} `}>
        <div className={`w-[300px] overflow-y-auto  bg-white h-full px-6 py-4 `}>
            <div className="flex items-center">
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <h1 className="font-Roboto italic font-semibold text-2xl text-h5/80">Rod<span className="text-teal-500">Shop</span></h1>
                </Link>
                <button className="outline-none ml-auto duration-100 ease-in hover:text-red-500 text-lg border p-1 rounded shadow-sm" onClick={openSide}><GoEyeClosed /></button>
            </div>
            <div className="mt-4">
                <ul className="list-none">
                    {
                        asideData.map((item) => <SidebarItem key={item.title} {...item} toggling={toggling} selected={selected} openSide={openSide} />)
                    }

                </ul>
            </div>
        </div>
    </aside >
}

AsideNavigation.propTypes = {
    isOpen: bool.isRequired,
    openSide: func.isRequired
}

const SidebarItem = ({ title, icon: Icon, selected, subMenu, toggling }) => {
    return <li className="cursor-pointer" >
        <div id="toggling" onClick={() => toggling(title)} className={` flex gap-2 items-center rounded border  duration-200 ease-in hover:border-gray-300 font-Roboto text-h5/90 font-medium px-2 py-1 ${selected.title === title ? 'border-gray-400/50  shadow' : ' border-white shadow-none'} group duration-500 ease-in`}>
            <span className={`border shadow-sm text-lg  p-1 rounded-md group-hover:text-teal-700 ${title === selected.title ? 'text-teal-700' : null}`}>{Icon ? <Icon /> : null}</span>
            <span  >{title}</span>
            <span className={`ml-auto text-xl duration-200 ease-linear group-hover:rotate-90  ${title === selected.title ? 'rotate-90 text-teal-700/80' : null}`}><FaPersonWalkingArrowRight /></span>
        </div>
        {/* sub menu */}
        {subMenu && <ul className={`list-none mt-2 grid gap-1 justify-end duration-300 ease-linear ${selected.title === title ? 'h-[166px] opacity-100' : 'h-0 overflow-hidden opacity-0'}`}>
            {subMenu.map((slink) => (
                <Link key={slink.title} to='#t'>
                    <li id="links" onClick={() => toggling(title, slink.title)} className={`py-1 px-2  duration-300 border w-[200px] rounded border-white
ease-linear
font-medium hover:border-gray-300 hover:rounded  text-sm ${selected.subTitle === slink.title ? 'text-teal-700 border-gray-200' : 'text-gray-900/70 hover:text-gray-900 '}`}>
                        <h5>{slink.title}</h5>
                    </li>
                </Link>

            ))}
        </ul>}
    </li>
}

SidebarItem.propTypes = {
    title: string.isRequired,
    icon: func.isRequired,
    selected: object.isRequired,
    subMenu: array,
    toggling: func.isRequired,
}

export default AsideNavigation