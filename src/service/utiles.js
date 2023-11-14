export const getIndex = (arr, cb) =>
  arr.map((item) => {
    return {
      ...item,
      ...cb(item),
    };
  });
// export const getIndex = () => {};
//   active: title === item.title && !item.active,

export const sizeConfig = {
  size: '300px',
  ml: '300px',
};
