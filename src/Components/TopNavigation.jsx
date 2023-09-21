import { bool, func } from "prop-types"
import { CgMenu } from "../Static/Icon"
import { topNav } from "../Static/data"

const TopNavigation = ({ isOpen, openSide }) => {
    const user = false
    const scroll = true
    const arr = [1]
    return (
        <div className={`py-2 ${scroll ? 'fixed z-10 bg-white shadow-lg  top-0 left-0 w-full px-[26px]  py-4' : null}`}>
            <nav className="flex">
                <div className="flex items-center gap-4">
                    <button className="border shadow-sm  text-2xl text-teal-700 rounded-sm" onClick={openSide}><CgMenu /></button>
                    <input className="border hidden md:visible rounded px-2 " type="search" />
                </div>
                <ul className="list-none flex gap-4 items-center text-2xl ml-auto">
                    {
                        topNav.map(({ label, icon: Icon, active }) => (
                            <li key={label} className="group relative cursor-pointer ">
                                <div className="">
                                    <span className="text-gray-900/70 duration-150 ease-in hover:text-teal-700"><Icon /></span>

                                    {active && <span className=" absolute top-0 right-0 rounded bg-red-500 w-2 h-2"></span>}
                                </div>
                                <span className="hidden absolute group-hover:block shadow-md text-sm px-2 z-10   bg-white rounded top-8 -left-8 font-medium">{user && label === 'Dashboard' ? 'Dashboard' : label} </span>
                            </li>
                        ))
                    }


                </ul>
            </nav>
        </div>
    )
}



TopNavigation.propTypes = {
    isOpen: bool.isRequired,
    openSide: func.isRequired
}

export default TopNavigation
