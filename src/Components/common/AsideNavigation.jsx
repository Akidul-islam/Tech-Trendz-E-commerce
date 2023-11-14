import { string, array, any } from 'prop-types';
import { useRef } from 'react';
import { FaPersonWalkingArrowRight } from 'react-icons/fa6';
import { GoEyeClosed } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  linkActive,
  subLinkActive,
  toggleMenu,
} from '../../Redux/features/Navigation';
import { asideData } from '../../Static/data';
const AsideNavigation = () => {
  const isOpen = useSelector((state) => state.navigation.isOpen);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const elementRef = useRef(null);

  const mobileDevice = `fixed z-[99] top-0 left-0  h-screen bg-gray-800/70  overflow-hidden  duration-500 w-full ease-linear ${
    isOpen ? 'translate-x-0 opacity-100 ' : '-translate-x-full opacity-0'
  } `;

  return (
    <aside
      id='closeSide'
      ref={elementRef}
      className={`${mobileDevice} shadow-lg md:bg-none  ${
        isOpen ? 'md:w-[80px] md:overflow-none' : 'md:w-[300px]'
      }  md:translate-x-0 md:opacity-100  md:rounded-sm`}
    >
      <div
        className={` w-[300px] overflow-y-scroll bg-white  h-full px-6 py-4 `}
      >
        <div className='flex items-center  '>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1 className='font-Roboto italic font-semibold text-2xl text-h5/80'>
              Rod<span className='text-teal-500'>Shop</span>
            </h1>
          </Link>
          <button
            className='outline-none ml-auto duration-100 ease-in hover:text-red-500 text-lg border p-1 rounded shadow-sm'
            onClick={() => dispatch(toggleMenu())}
          >
            <GoEyeClosed />
          </button>
        </div>
        <div className='mt-4'>
          <ul className={`list-none ${isOpen && 'md:grid md:gap-1'}`}>
            {asideData[user.roles].map((item) => (
              <SidebarItem key={item.title} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ title, icon: Icon, path, subMenu }) => {
  const selectIcon = useRef(null);
  const { isTitle, isSubTitle, isOpen } = useSelector(
    (state) => state.navigation
  );
  const dispatch = useDispatch();

  // current path and get subTitle

  return (
    <li className='cursor-pointer  duration-200 group' ref={selectIcon}>
      <Link to={`/dashboard${path}`} style={{ textDecoration: 'none' }}>
        <div
          id='toggling'
          onClick={() => dispatch(linkActive(title))}
          className={` flex gap-4 items-center rounded border  duration-200 ease-in hover:border-gray-300 font-Roboto text-h5/90 font-medium px-2 py-1 ${
            isTitle === title
              ? 'border-gray-400/50  shadow'
              : ' border-white shadow-none'
          } group duration-500 ease-in ${
            isOpen && 'md:rounded-l-xl md:border-white'
          }`}
        >
          <span
            className={` border shadow-sm text-lg  p-1 rounded-md group-hover:text-teal-700 ${
              title === isTitle ? 'text-teal-700' : null
            } `}
          >
            {Icon ? <Icon /> : null}
          </span>
          <span className={` ${isOpen && 'md:hidden'}`}>{title}</span>
          <span
            className={`ml-auto text-xl duration-200 ease-linear group-hover:rotate-90  ${
              title === isTitle ? 'rotate-90 text-teal-700/80' : null
            } ${isOpen && 'md:hidden'}`}
          >
            <FaPersonWalkingArrowRight />
          </span>
        </div>
      </Link>
      {/* sub menu */}
      {subMenu && (
        <div
          className={`duration-300 ease-linear  overflow-hidden ${
            isTitle === title ? ' opacity-100 h-auto' : 'opacity-0 h-0'
          } ${isOpen && 'md:hidden'}`}
        >
          <ul className={`list-none mt-2 grid gap-1  justify-end `}>
            {subMenu.map((slink) => (
              <Link key={slink.title} to={`/dashboard${slink.path}`}>
                <li
                  id='links'
                  onClick={() => dispatch(subLinkActive(slink.title))}
                  className={`py-1 px-2  duration-200  border w-[200px] rounded border-white
ease-linear
font-medium hover:border-gray-300 hover:rounded  text-sm ${
                    isSubTitle === slink.title
                      ? 'text-teal-700 border-gray-200'
                      : 'text-gray-900/70 hover:text-gray-900 '
                  }`}
                >
                  <h5>{slink.title}</h5>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

SidebarItem.propTypes = {
  title: string.isRequired,
  icon: any,
  subMenu: array,
  path: any,
};

export default AsideNavigation;
