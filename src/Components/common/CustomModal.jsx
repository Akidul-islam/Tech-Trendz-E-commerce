import {
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';
import { node, func, bool } from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';

const CustomModal = ({ children, handleOpen, open }) => {
  return (
    <>
      <Dialog
        open={open}
        className='rounded w-[18.5rem] h-screen flex-none'
        handler={handleOpen}
      >
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <IconButton
            onClick={handleOpen}
            className='text-teal-800 p-0 text-3xl absolute top-0 right-4 h-auto w-0 '
          >
            <AiFillCloseCircle />
          </IconButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};
CustomModal.propTypes = {
  children: node,
  handleOpen: func,
  open: bool,
};

export default CustomModal;
