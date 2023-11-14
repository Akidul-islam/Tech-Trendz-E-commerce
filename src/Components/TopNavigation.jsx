import { array } from "prop-types"
import { CgMenu } from "../Static/Icon"
import { topNav } from "../Static/data"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleMenu } from "../Redux/features/Navigation"
const TopNavigation = () => {
    const isOpen = useSelector(state => state.navigation.isOpen)
    const dispatch = useDispatch()
    const mobileDevice = 'py-4 fixed z-[99] bg-white shadow-md  top-0 left-0 w-full px-[26px]  py-4 '

    return (
        <div className={` ${mobileDevice} md:duration-300 md:ease-linear ${isOpen ? 'inactive-size md:left-[80px]' : ' size-of-width md:left-[300px]'}`}  >
            <nav className="flex">
                <div className="flex items-center gap-4 md:gap-12">
                    <button className={`border shadow-sm  text-2xl text-teal-700 rounded-sm  ${isOpen ? 'md:inline-block' : 'md:hidden'}`} onClick={() => dispatch(toggleMenu())}><CgMenu /></button>
                    <input className="border shrink text-sm md:w-[300px]  py-1 shadow-sm rounded px-2 basis-full " placeholder="Search customer/ product " type="search" />
                </div>
                <TopRightNav navItem={topNav} />
            </nav>

        </div>
    )
}


export default TopNavigation

const TopRightNav = ({ navItem }) => {
    const user = useSelector(state => state.auth.user)
    return <ul className="list-none flex gap-4 items-center text-2xl ml-auto">
        {
            navItem.map(({ label, icon: Icon, active, items, path }) => (
                <li key={label} className="group relative cursor-pointer w-[20px] h-[20px]">
                    <div>
                        <div>
                            {
                                label !== 'Account' ? <span className="text-gray-900/70 duration-150 ease-in hover:text-teal-700"><Icon /></span> : <div className="text-gray-900/70 duration-150 ease-in hover:text-teal-700">
                                    <Link to={`${path}`}>
                                        {
                                            user && user.photoURL ? <img src={user.photoURL} className="object-cover" alt="" /> : <Icon />
                                        }

                                    </Link>
                                </div>
                            }
                        </div>
                        {items ? <div className="absolute scale-0 group-hover:scale-100 bg-white py-2 px-8 shadow-md z-10 -translate-x-1/2  left-1/2 top-10 duration-200 ease-in rounded">
                            {
                                items.map((lang) => (<h6 key={lang} className="text-gray-900 text-sm font-medium only:first:mt-0 space-y-1 duration-200 ease-in hover:text-teal-700 ">{lang}</h6>))
                            }
                        </div> : <span className="hidden absolute group-hover:block -translate-x-1/2 left-1/2 shadow-md text-sm py-1 px-4 z-10   bg-white rounded top-10  font-medium">
                            {label}
                        </span>
                        }
                        {active && <span className=" absolute top-0 right-0 rounded bg-red-500 w-2 h-2"></span>
                        }
                    </div>
                </li>
            ))
        }
    </ul>
}

TopRightNav.propTypes = {
    navItem: array,
}

