import { useState } from "react";

import avatar from "../../../Assets/avatar.jpg";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../../Styles/Style";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropType from "prop-types";
// import { yupResolver } from '@hookform/resolvers/yup'
// import { registerSchema } from "../../../service/validationSchema";

const Profile = ({ setViewProfile }) => {
  const { user } = useSelector(state => state.auth)
  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(registerSchema)
  })
  const [avaterSelect, SetAvaterSelect] = useState(null)


  // handleImageChange
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      SetAvaterSelect(event.target.result)
    }
    reader.readAsDataURL(file)
  };
  // handle form onSubmit
  const updateHandler = (data) => {
    console.log(data)
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -500 }}>
      <div className="flex justify-center w-full">
        <div className="relative h-[150px]">
          <div className="relative h-[150px]">
            <img
              src={avaterSelect ? avaterSelect : user ? user.photoURL : avatar}
              alt="profile/image"
              className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3957db]"
              onClick={() => setViewProfile(true)}
            />

            <div className="absolute w-[30px] h-[30px] bg-[#e3e9ee] bottom-[5px] rounded-full flex items-center justify-center right-[5px] cursor-pointer">
              <input
                type="file"
                id="profile/image"
                className="hidden"
                {...register('avater', { onChange: handleImageChange })}
              />

              <label htmlFor="profile/image">
                <AiOutlineCamera className="cursor-pointer" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit(updateHandler)}>
          <div className="flex w-full flex-wrap pb-3">
            {/* name input */}
            <div className="w-full 800px:w-[50%] pb-4">
              <label htmlFor="name" className="block pb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user?.name}
                {...register('displayName')}
                className={`${styles.input} !w-[95%] focus:border-[#3957db]`}
              />
            </div>

            {/* email input */}
            <div className="w-full 800px:w-[50%] 800px:pb-4 pb-6">
              <label htmlFor="email" className="block pb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user?.email || ''}
                {...register('email')}
                className={`${styles.input} !w-[95%] focus:border-[#3957db]`}
              />
            </div>

            {/* phone number input */}
            <div className="w-full 800px:w-[50%] 800px:pb-4 pb-6">
              <label htmlFor="phoneNumber" className="block pb-2">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                id="number"
                defaultValue={user?.phoneNumber || ''}
                {...register('phoneNumber')}
                className={`${styles.input} !w-[95%] focus:border-[#3957db]`}
              />
            </div>

            {/* phone number input */}
            <div className="w-full 800px:w-[50%] 800px:pb-4 pb-6">
              <label htmlFor="password" className="block pb-2">
                Update Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                id="password"
                {...register('password')}
                className={`${styles.input} !w-[95%] focus:border-[#3957db]`}
              />
            </div>

            {/* button */}
            <div
              className={`${styles.button} hover:text-white !rounded-[5px] w-[30%] transition !h-11 border bg-transparent border-[#3957db] hover:bg-[#3957db]`}>
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

Profile.propTypes = {
  setViewProfile: PropType.func,
}

export default Profile;
