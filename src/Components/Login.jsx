import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../Styles/Style";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../service/validationSchema";
import { API } from "../Redux/features/Auth";
import { useDispatch, useSelector } from "react-redux";
// custom alert message
import AlertMessage from "./common/AlertMessage";


const Login = () => {
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userLogin),
    mode: 'onChange',
  })
  const { isLoading, isSuccess, isLogout, isError, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loginHandler = async (data) => {
    try {
      await dispatch(API.loginUser(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { if (user) navigate('/') }, [navigate, user])


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-[90%] 800px:w-[45%]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(loginHandler)}>
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
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  {...register('remender')}
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forget-password"
                  className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                {isLoading ? "Checking" : "Submit"}
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* toast message */}
      {isSuccess && <AlertMessage title={'Registeration Successfull'} msg={'Please Login And Enjoyed our Product'} variant="green" />}
      {isError && <AlertMessage title={isError} msg={'Please Login And Enjoyed our Product'} variant="green" />}
      {isLogout && <AlertMessage title={'Logout Successfull'} msg={'Please Login And Enjoyed our Product'} variant="green" />}
      {/* <ToastContainer
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
      /> */}
    </div>
  );
};

export default Login;
