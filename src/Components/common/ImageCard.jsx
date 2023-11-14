import banner from '../../assets/banner.jpg'
import img from '../../assets/avatar.jpg'
import PropTypes from 'prop-types'
const ImageCard = ({ register, name, handler }) => {
    const avater = true
    return (
        <div className="variant-pro-items">
            <div className="h-full w-full">
                <img src={avater ? banner : img} className="w-full h-full  object-cover" alt="products" />
            </div>
            <input
                className="absolute z-10 top-1/2  scale-[10] opacity-0"
                type="file"
                multiple
                {...register(name, { onChange: handler })}
            />
        </div>
    )
}

ImageCard.propTypes = {
    register: PropTypes.any,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
}

export default ImageCard
