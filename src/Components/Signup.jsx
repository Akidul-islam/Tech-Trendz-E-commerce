import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../Styles/Style";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { registerSchema } from "../service/validationSchema";
import { API } from "../Redux/features/Auth";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "./common/AlertMessage";
// validtionSchema

const Signup = () => {
  const [avater, setAvater] = useState(null);
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange"
  })
  const { isLoading, isError, isSuccess } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvater(event.target.result);
      };

      reader.onprogress = (data) => {
        if (data.lengthComputable) {
          const progress = (data.loaded / data.total) * 100;
          console.log(progress);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    // remove .extention
    const name = data.avater[0].name.split('.').slice(0, -1).join('.');
    // ref for storage
    const pathName = 'Users/' + name
    if (!name) {
      console.log(`${name} invalid`)
      return
    }
    await dispatch(API.signupUser({ ...data, avater: data.avater[0], pathName }))

  };

  useEffect(() => {
    if (isSuccess) navigator('/login')

  }, [isSuccess, navigator])

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center align-middle">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a new user
          </h2>
        </div>
        <div className="mt-8 mx-auto w-[90%] 800px:w-[45%]">
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium  ${errors.displayName ? 'text-red-500' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    autoComplete="name"
                    {...register('displayName')}
                    className={`appearance-none block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${errors.displayName ? 'border-red-300' : 'border-gray-700'} ${errors.displayName ? 'focus:border-red-500 ' : ' focus:border-teal-600'} sm:text-sm`}
                  />
                </div>
                {errors.displayName && <small className="font-Poppins text-red-400 text-sm mt-1">{errors.displayName?.message}</small>}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium  ${errors.email ? 'text-red-500' : 'text-gray-700'}`}>
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    className={`appearance-none block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${errors.email ? 'border-red-300' : 'border-gray-700'} ${errors.email ? 'focus:border-red-500 ' : ' focus:border-teal-600'} sm:text-sm`}

                    autoComplete="email"
                    {...register('email')}
                  />
                </div>
                {errors.email && <small className="text-red-400">{errors.email?.message}</small>}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium  ${errors.password ? 'text-red-500' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    autoComplete="current-password"
                    {...register('password')}
                    className={`appearance-none block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${errors.password ? 'border-red-300' : 'border-gray-700'} ${errors.password ? 'focus:border-red-500 ' : ' focus:border-teal-600'} sm:text-sm`}
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                {errors.password && <small className="font-Poppins text-red-400 text-sm mt-1">{errors.password?.message}</small>}

              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium  ${errors.phoneNumber ? 'text-red-500' : 'text-gray-700'}`}>
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type={'number'}
                    autoComplete="off"
                    {...register('phoneNumber')}
                    className={`appearance-none block w-full px-3 py-2 border  rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${errors.phoneNumber ? 'border-red-300' : 'border-gray-700'} ${errors.phoneNumber ? 'focus:border-red-500 ' : ' focus:border-teal-600'} sm:text-sm`}
                  />
                </div>
                {errors.phoneNumber && <small className="font-Poppins text-red-400 text-sm mt-1">{errors.phoneNumber?.message}</small>}

              </div>


              <div className={`${styles.noramlFlex}`}>
                <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
                  {avater ? (
                    <img
                      src={avater}
                      alt="avater"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RxAvatar className="w-10 h-10" />
                  )}
                </span>

                <label
                  htmlFor="file-input"
                  className={`ml-5 flex items-center  justify-center px-4 py-2 border ${avater ? 'border-teal-600' : 'border-red-500'} rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}>
                  <span>Upload file</span>
                  <input
                    type="file"
                    {...register('avater', { onChange: fileHandler })}
                    name="avater"
                    id="file-input"
                    className="sr-only"
                  />
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={avater ? false : true}
                  className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white duration-150 ease-in ${avater ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500/50'} `}>
                  {isLoading ? 'loading' : "Submit"}
                </button>

                {/* toast message */}
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover={false}
                  theme="light"
                />
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isError && <AlertMessage title={isError} duration={3000} variant="#F11A7B" msg={'Registeration fail please give valild Information'} />}
    </>

  );
};

export default Signup;
