import { string } from 'prop-types';

const LazyImage = ({ img, alt, className }) => {
  return <img src={img} alt={alt} className={`${className} object-cover`} />;
};

LazyImage.propTypes = {
  img: string,
  alt: string,
  className: string,
};

export default LazyImage;
