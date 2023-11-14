/* eslint-disable react-hooks/exhaustive-deps */
import { func, string, node } from 'prop-types';
import { useRef, useState, useEffect, Children, cloneElement } from 'react';
import { BiSolidDownArrow } from '../../Static/Icon';

const Select = ({ title, onChange, Icon, children, name, ...rest }) => {
  const [selectText, setSelectText] = useState({
    title,
    isToggling: false,
  });
  const ref = useRef();

  const optionClick = (text) => {
    if (typeof onChange === 'function') onChange(name, text);
    setSelectText({ title: text, isToggling: false });
  };

  // toogling
  const toggle = () =>
    setSelectText({ ...selectText, isToggling: !selectText.isToggling });

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelectText({ ...selectText, isToggling: false });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div ref={ref} className='relative'>
      <button
        {...rest}
        className={`text-gray-900/60 font-medium w-full shadow-sm  border  rounded-md py-2  duration-300 flex items-center justify-between md:gap-x-2 px-2 hover:border-teal-700/70 ${
          selectText.isToggling && 'border-teal-600'
        }`}
        onClick={toggle}
      >
        <span>{selectText.title || 'Select Option'}</span>
        {Icon ? (
          <Icon />
        ) : (
          <span
            className={`text-teal-900/80 duration-300 ease-linear ${
              selectText.isToggling ? 'rotate-180' : ' '
            } `}
          >
            <BiSolidDownArrow />
          </span>
        )}
      </button>
      <div
        className={`duration-300 ease-linear absolute w-full z-10  rounded py-1 bg-white shadow-md mt-2 ${
          selectText.isToggling
            ? 'scale-100 border-teal-400 opacity-100'
            : 'scale-0  opacity-0'
        }`}
      >
        <ul className='list-none flex flex-col'>
          {Children.map(children, (child) =>
            cloneElement(child, {
              onClick: () => optionClick(child.props.children),
            })
          )}
        </ul>
      </div>
    </div>
  );
};

Select.propTypes = {
  title: string,
  onChange: func,
  name: string,
  children: node,
  Icon: node,
};

export default Select;

export const Option = ({ children, onClick, ...rest }) => {
  return (
    <li
      onClick={onClick}
      {...rest}
      className='cursor-pointer duration-200 ease-linear font-Roboto text-sm px-4 py-1 hover:bg-gray-200/60 hover:shadow-sm'
    >
      {children}
    </li>
  );
};

Option.propTypes = {
  children: node,
  onClick: func,
};
