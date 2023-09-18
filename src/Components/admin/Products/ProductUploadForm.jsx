/* eslint-disable react/jsx-key */
import { useForm } from "react-hook-form"
import ImageCard from "../../common/ImageCard"
// custom input
import InputItem from "../../common/InputItem"
import { useDispatch, useSelector } from "react-redux"
// action list
import { categoryTitle, enableOption, cancelOption, showInput, addVariant } from "../../../Redux/features/ProductFormSlice"


const ProductUploadForm = () => {
    const { mainCategory, sub_category, variantMeta: { isEnable, isInput, variantOption } } = useSelector((state => state.productForm))
    const { register, handleSubmit, reset, watch } = useForm()

    const dispatch = useDispatch()
    const changeHandler = (event) => {
        const { type } = event.target
        if (type === 'file') {
            console.log('file')
        }
    }

    const addVOption = () => {
        const type = watch('type')
        const value = watch('value').split(',').map(i => i.trim())
        dispatch(addVariant({ type, value }))
        reset({ type: '', value: '' })


    }

    const editvariant = (value) => {
        console.log(value)
    }

    const mainCtgTitle = (e) => dispatch(categoryTitle(e.target.value))

    // submit handler
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="shadow-lg min-h-screen bg-white rounded-md py-6 px-4">
            <h5 className="text-h5 font-medium opacity-90 tracking-wider text-lg font-Roboto italic">Product Settings</h5>
            <div className="mt-4" >
                <span className="block field-label mb-2.5 text-gray-900/80 text-sm font-[500] font-Poppins">Product Images</span>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid gap-y-8">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:gap-x-4  md:gap-x-3 lg:gap-x-2 md:grid-cols-3 lg:grid-cols-3 1000px:grid-cols-4">
                            <ImageCard register={register} name="img1" handler={changeHandler} />
                            <ImageCard register={register} name="img2" handler={changeHandler} />
                            <ImageCard register={register} name="img3" handler={changeHandler} />
                            <ImageCard register={register} name="img4" handler={changeHandler} />
                        </div>
                        {/* additional information*/}
                        <div className="grid gap-3">
                            <h1 className="text-gray-800 tracking-wider font-Poppins font-light text-md">Additional Information </h1>
                            {/* features option */}
                            <div>
                                <h6 className="text-gray-900  font-medium text-[20px] relative z-10 inline-block before:pt-[1rem] before:rounded-lg before:absolute before:content-[' ']  before:bg-teal-50  before:top-0  before:w-full before:h-full before:px-[1rem] before:z-[-1] before:animate-pulse"> Features Options</h6>
                                <div className="mt-2">
                                    <InputItem type="checkbox" label="Features Product" name='check' register={register} />
                                </div>
                            </div>

                            <div className="">
                                <h5 className="font-semibold text-gray-900/80  tracking-wide text-[1.22rem]">Product Options</h5>
                                <div className="shadow-lg p-4 rounded-sm grid gap-4">
                                    <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                                        <p className=" text-sm tracking-wide text-left">you can add<span className="text-teal-600"> multiple product </span>  variant such colors, size and matrials</p>

                                        {isEnable || <button className="border border-h5/60 p-1 font-medium 
                                    shadow-md rounded-md w-full max-w-[150px] ease-in-out duration-300  tracking-wide
                                    hover:border-white hover:bg-gray-900 hover:text-white
                                    self-start md:self-center" type="button" onClick={() => dispatch(enableOption())}
                                        >Enable Option</button>
                                        }
                                    </div>

                                    {isEnable && <div>
                                        {isInput && <div className="grid gap-4 grid-cols-2">

                                            <InputItem type="text" register={register} name="type" label="type" />

                                            <InputItem type="text" register={register} name="value" label="values (tag , separate)" />

                                            <div className="col-span-2 flex justify-between">
                                                <button className=" rounded  border border-gray-900  shadow-sm px-4 font-medium duration-100 ease-in hover:bg-gray-900 hover:text-white hover:shadow-md" type="button" onClick={() => dispatch(cancelOption())}>Cancel</button>
                                                <button className=" rounded  border border-gray-900  shadow-sm px-4 font-medium duration-100 ease-in hover:bg-gray-900 hover:text-white hover:shadow-md" type="button" onClick={addVOption}>Add</button>
                                            </div>

                                        </div>}
                                        <button className="border mt-4 border-gray-900 px-2 py-1 rounded-md disabled:opacity-50" onClick={() => dispatch(showInput())} disabled={isInput ? true : false}>add option</button>
                                    </div>}

                                    {/* variant content */}
                                    {variantOption !== 0 && <div className="variant-content">
                                        <ul>
                                            {variantOption.map((variant) => (
                                                <li key={variant.type} className=" flex  justify-between items-center">
                                                    <div>
                                                        <p className="text-gray-800 capitalize font-medium">{variant.type}</p>
                                                    </div>
                                                    <div className='flex gap-4'>
                                                        {variant.value.map(v => (
                                                            <span className="shadow-md font-medium px-2 border w-20 text-center capitalize mt-2 rounded"
                                                                key={v} style={{ color: v }}>{v}</span>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <button className="border px-3 rounded shadow" type="button" onClick={() => editvariant(variant.type)} >Edit</button>
                                                    </div>
                                                </li>
                                            ))}</ul>
                                    </div>}


                                    {/* <div className="tag flex gap-4 flex-wrap">
                                        <label className="shadow-md p-1 px-4 text-gray-900/70 font-medium font-Poppins border rounded-md">
                                            <h5 className="inline-block ">black</h5>
                                            <button className="ml-4">X</button>
                                        </label>
                                        <label className="shadow-md p-1 px-4 text-gray-900/70 font-medium font-Poppins border rounded-md">
                                            <h5 className="inline-block ">green</h5>
                                            <button className="ml-4">X</button>
                                        </label>
                                        <label className="shadow-md p-1 px-4 text-gray-900/70 font-medium font-Poppins border rounded-md">
                                            <h5 className="inline-block ">white</h5>
                                            <button className="ml-4">X</button>
                                        </label>

                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* upload */}
                    <div className="product-configration">

                        <InputItem name="productName" label="Product Name" type="text" register={register} defaultValue={'arabic watch'} />

                        <InputItem name="brand" label="Brand Name" type="text" register={register} defaultValue={'Rolex'} />

                        <InputItem label="Category" name="category" type="select" onChange={mainCtgTitle} register={register} option={mainCategory} />

                        <InputItem label="Sub Category" name="subCategory" type="select" register={register} option={sub_category} />

                        <InputItem label="Regular Price" name="regularPrice" type="number" register={register} />

                        <InputItem type="number" label="Sales Price" name="salesPrice" register={register} />

                        <InputItem type="number" label="Stock Item" name="stock" register={register} />

                        <InputItem type="datetime-local" label="Upload Date" name="date" register={register} />
                        <div className="items-start">
                            <button className="border border-teal-700 px-4 py-1 font-medium uppercase rounded-md shadow-md ease-out duration-200 hover:bg-green-600 hover:text-white hover:white">Upload Product</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductUploadForm
