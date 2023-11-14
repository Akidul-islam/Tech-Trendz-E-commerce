
import PropTypes from 'prop-types'
import { Fragment } from 'react';

const InputItem = ({ type, name, label, option, defaultValue, register, onChange, className, placeholder, errors }) => {
    let renderItem;
    switch (type) {
        case 'text':
        case 'number':
            renderItem = (<div className={className}>
                <label htmlFor={name} placeholder={placeholder} className="labels">{label}</label>
                <input type={type} {...register(name, { onChange: onChange })} placeholder={placeholder} defaultValue={defaultValue} className={`inputs w-full ${errors[name] && 'border-red-500'}`} />
                {errors[name] ? <p>{errors[name]?.message}</p> : null}
            </div>)
            break;
        case 'checkbox':
            renderItem = <div className={className}>
                <input  {...register(name)} type={type} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-900 rounded " />
                <label htmlFor={label} className="font-Roboto text-gray-800 text-sm">{label}</label>
            </div>
            break
        case 'select':
            renderItem = (<div className={className}>
                <label htmlFor={name} className="labels">{label}</label>
                <select type={type} {...register(name, { onChange: onChange })} className="inputs w-full relative font-medium text-gray-900/80 font-Poppins " defaultValue={defaultValue} >
                    {option.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}

                </select>
            </div>)
            break;
        case 'datetime-local':
            renderItem = (
                <div className={className}>
                    <label className='labels' htmlFor={name}>{label}</label>
                    <input className='inputs w-full text-gray-900/80 font-medium text-sm' type={type}  {...register(name)} defaultValue={defaultValue} />
                </div>
            )
            break
        case 'textarea':
            renderItem = (<div>
                <label className='labels' htmlFor={name}>{label}</label>
                <textarea rows='5' className="resize-none outline-none border rounded-md mt-2 focus:border-gray-900/70 p-2 text-sm font-medium italic w-full" {...register(name)} placeholder='write about your product' defaultValue={defaultValue} />
            </div>)
            break
        default:
            renderItem = (<p>input type does not found</p>)
            break;
    }

    return <Fragment>
        {renderItem}
    </Fragment>
}
InputItem.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    register: PropTypes.any.isRequired,
    onChange: PropTypes.func,
    option: PropTypes.array,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.any
}

export default InputItem
