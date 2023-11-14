import { useForm } from 'react-hook-form';
// custom input
import InputItem from '../../common/InputItem';
import { useDispatch, useSelector } from 'react-redux';
// action list
import {
  categoryTitle,
  enableOption,
  cancelOption,
  showInput,
  addVariant,
} from '../../../Redux/features/ProductFormSlice';
import { useState } from 'react';
import firebaseConfig from '../../../../firebase.config';
import { loadStart, loadStop } from '../../../Redux/features/ModalSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidate } from '../../../service/validationSchema';

const ProductUploadForm = () => {
  const {
    mainCategory,
    sub_category,
    variantMeta: { isEnable, isInput, variantOption },
  } = useSelector((state) => state.productForm);
  const isLoading = useSelector((state) => state.modal.isLoading);
  const [imgaes, setImages] = useState([]);
  // const { isOpen } = useSelector((state => state.navigation))
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(productValidate()),
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const { type, files } = event.target;
    if (type === 'file') {
      const imageList = Array.from(files).slice(0, 4);
      imageList.forEach((item) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages((prev) => [...prev, event.target.result]);
        };
        reader.readAsDataURL(item);
      });
    }
  };

  const addVOption = () => {
    const type = watch('type');
    const value = watch('value')
      .split(',')
      .map((i) => i.trim());
    if (!type || !value) return alert('type and value does not empty');
    dispatch(addVariant({ type, value }));
    reset({ type: '', value: '' });
  };

  const editvariant = (value) => {
    console.log(value);
  };

  const mainCtgTitle = (e) => dispatch(categoryTitle(e.target.value));

  // submit handler
  const onSubmit = async (data) => {
    data.variants = variantOption || [];
    try {
      dispatch(loadStart());
      await firebaseConfig.ProductUpload(data);
      dispatch(loadStop());
    } catch (error) {
      dispatch(loadStop());
      console.log(error);
    }
  };

  return (
    <div className='shadow-lg  bg-white rounded-md py-6'>
      <div className='mt-4 px-2'>
        <span className='block field-label mb-2.5 text-gray-900/80 text-sm font-[500] font-Poppins'>
          Product Images
        </span>
        <form
          className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              type='file'
              {...register('images', { onChange: changeHandler })}
              multiple
            />
            <div className=' flex  flex-wrap gap-4 mt-4'>
              {imgaes &&
                imgaes.map((item) => (
                  <div
                    className={`md:w-[140px] h-[100px] rounded-sm shadow-md overflow-hidden`}
                    key={item}
                  >
                    <img
                      src={item}
                      className='w-full h-full duration-150 ease-linear  object-cover'
                      alt={'avater'}
                    />
                  </div>
                ))}
            </div>
            {/* additional information*/}
            <div className='grid  mt-4 gap-3'>
              <h1 className='text-gray-800 tracking-wider  font-medium text-lg'>
                Additional Information{' '}
              </h1>
              {/* features option */}
              {/* <div>
                                <h6 className="text-gray-900  font-medium text-lg relative z-10 inline-block before:pt-[1rem] before:rounded-lg before:absolute before:content-[' ']  before:bg-teal-50  before:top-0  before:w-full before:h-full before:px-[1rem] before:z-[-1] before:animate-pulse"> Features Options</h6>
                                <div className="mt-2">
                                    <InputItem type="checkbox" label="Features Product" className={'flex items-center gap-3'} name='features' register={register} />
                                </div>
                            </div> */}

              <div className=''>
                <h5 className='font-semibold text-gray-900/80  tracking-wide text-lg'>
                  Product Options
                </h5>
                <div className='shadow-md p-4 rounded-sm grid gap-4'>
                  <div className='flex flex-col gap-2 sm:flex-row items-center'>
                    <p className=' text-sm tracking-wide text-left'>
                      you can add
                      <span className='text-teal-600'>
                        {' '}
                        multiple product{' '}
                      </span>{' '}
                      variant such colors, size and matrials
                    </p>

                    {isEnable || (
                      <button
                        className='border border-h5/60 p-1 font-medium 
                                    shadow-md rounded-md inline-block ease-in-out duration-300  tracking-wide
                                    hover:border-white hover:bg-gray-900 hover:text-white
                                    self-start md:self-center'
                        type='button'
                        onClick={() => dispatch(enableOption())}
                      >
                        Enable Option
                      </button>
                    )}
                  </div>

                  {isEnable && (
                    <div>
                      {isInput && (
                        <div className='grid gap-4 grid-cols-2'>
                          <InputItem
                            type='text'
                            register={register}
                            name='type'
                            errors={errors}
                            label='types'
                          />

                          <InputItem
                            type='text'
                            register={register}
                            name='value'
                            errors={errors}
                            label='values (tag , separate)'
                          />

                          <div className='col-span-2 flex justify-between'>
                            <button
                              className=' rounded  border border-gray-900  shadow-sm px-4 font-medium duration-100 ease-in hover:bg-gray-900 hover:text-white hover:shadow-md'
                              type='button'
                              onClick={() => dispatch(cancelOption())}
                            >
                              Cancel
                            </button>
                            <button
                              className=' rounded  border border-gray-900  shadow-sm px-4 font-medium duration-100 ease-in hover:bg-gray-900 hover:text-white hover:shadow-md'
                              type='button'
                              onClick={addVOption}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                      <button
                        className='border mt-1 border-gray-900 px-2 py-1 rounded-md disabled:opacity-50 duration-150 hover:opacity-90 shadow-sm hover:shadow-md'
                        onClick={() => dispatch(showInput())}
                        disabled={isInput ? true : false}
                        type='button'
                      >
                        add option
                      </button>
                    </div>
                  )}

                  {/* variant content */}
                  {variantOption !== 0 && (
                    <div className='variant-content'>
                      <ul>
                        {variantOption.map((variant) => (
                          <li
                            key={variant.type}
                            className=' flex  justify-between items-center'
                          >
                            <div>
                              <p className='text-gray-800 capitalize font-medium'>
                                {variant.type}
                              </p>
                            </div>
                            <div className='flex gap-4'>
                              {variant.value.map((v) => (
                                <span
                                  className='shadow-md font-medium px-2 border w-20 text-center capitalize mt-2 rounded'
                                  key={v}
                                  style={{ color: v }}
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                            <div>
                              <button
                                className='border px-3 rounded shadow'
                                type='button'
                                onClick={() => editvariant(variant.type)}
                              >
                                Edit
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <InputItem
                  name='slug'
                  label='Describation'
                  type='textarea'
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* upload */}
          <div>
            <div className='grid md:grid-cols-2 gap-y-4 gap-x-2'>
              <InputItem
                name='productName'
                className={'md:col-span-2'}
                label='Product Name'
                errors={errors}
                type='text'
                register={register}
                defaultValue={'arabic watch'}
              />
              <InputItem
                name='brand'
                label='Brand Name'
                errors={errors}
                type='text'
                register={register}
                defaultValue={'Rolex'}
              />
              <InputItem
                label='Category'
                className={'flex flex-col'}
                name='category'
                type='select'
                onChange={mainCtgTitle}
                register={register}
                option={mainCategory}
              />
              <InputItem
                label='Sub Category'
                name='subCategory'
                type='select'
                register={register}
                option={sub_category}
              />
              <InputItem
                label='Product Type'
                errors={errors}
                name='productType'
                placeholder={'womens,mens watch'}
                type='text'
                register={register}
              />
              <InputItem
                label='Regular Price'
                name='regularPrice'
                type='number'
                errors={errors}
                register={register}
              />
              <InputItem
                type='number'
                label='Sales Price'
                name='salesPrice'
                errors={errors}
                register={register}
              />
              <InputItem
                type='number'
                label='Stock Item'
                errors={errors}
                name='stock'
                register={register}
              />
              <InputItem
                label='Stock Status'
                name='stockStatus'
                type='select'
                register={register}
                option={[
                  'IN STOCK',
                  'OUT OF STOCK',
                  'DEMAND ABLE',
                  'LOW INVENTORY',
                  'TEMPOARY',
                ]}
              />
              <InputItem
                label='Feature'
                name='featureStatus'
                type='select'
                register={register}
                option={[
                  'Features',
                  'Best Sales',
                  'Hot Sales',
                  'Events',
                  'Winter Collection',
                ]}
              />
              <InputItem
                type='datetime-local'
                label='Upload Date'
                className={'md:col-span-2 '}
                name='date'
                register={register}
              />
              <div className='items-start'>
                <button className='border border-teal-700 px-4 py-1 font-medium uppercase rounded-md shadow-md ease-out duration-200 hover:bg-green-600 hover:text-white hover:white'>
                  {isLoading ? 'loading' : 'Upload Product'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadForm;
