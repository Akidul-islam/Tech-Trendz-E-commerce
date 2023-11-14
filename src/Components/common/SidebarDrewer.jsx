import React from 'react';
import { Drawer, Typography } from '@material-tailwind/react';
import { bool, func, node, string } from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';

const SidebarDrawer = ({ handler, title, children, open }) => {
  return (
    <React.Fragment>
      <Drawer open={open} placement='right' className='p-2' onClose={handler}>
        <div className='mb-6  font-Roboto   flex items-center justify-between'>
          <Typography variant='h5' className='opacity-80 text-gray-900'>
            {title}
          </Typography>
          <span
            className='text-3xl duration-150 ease-in hover:text-red-600/60 cursor-pointer'
            onClick={handler}
          >
            <IoCloseCircleOutline />
          </span>
        </div>
        {children}
      </Drawer>
    </React.Fragment>
  );
};
SidebarDrawer.propTypes = {
  handler: func,
  children: node,
  open: bool,
  title: string,
};
export default SidebarDrawer;
