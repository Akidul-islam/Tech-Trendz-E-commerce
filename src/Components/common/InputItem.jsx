
import PropTypes from 'prop-types'
import { Fragment } from 'react';

const InputItem = ({ type, name, label, option, defaultValue, register, onChange }) => {
    let renderItem;
    switch (type) {
        case 'text':
        case 'number':
            renderItem = (<div className="grid gap-2 col-span-2"><label htmlFor={name} className="labels">{label}</label>
                <input type={type} {...register(name, { onChange: onChange })} defaultValue={defaultValue} className="inputs" />
            </div>)
            break;
        case 'checkbox':
            renderItem = <div className="flex items-center gap-3">
                <input  {...register(name)} type={type} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-900 rounded " />
                <label htmlFor={label} className="font-Roboto text-gray-800">{label}</label>
            </div>
            break
        case 'select':
            renderItem = (<div className="grid gap-2 col-span-2">
                <label htmlFor={name} className="labels">{label}</label>
                <select type={type} {...register(name, { onChange: onChange })} className="inputs relative font-medium text-gray-900/80 font-Poppins after:bg-red-600 after:content-[' '] after:absolute after:border after:border-red-600 after:outline-none" defaultValue={defaultValue} >
                    {option.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}

                </select>
            </div>)
            break;
        case 'datetime-local':
            renderItem = (
                <div className='grid gap-2 col-span-2'>
                    <label className='labels' htmlFor={name}>{label}</label>
                    <input className='inputs text-gray-900/80 font-medium text-sm w-full' type={type}  {...register(name)} defaultValue={defaultValue} />
                </div>
            )
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
    option: PropTypes.array
}

export default InputItem
