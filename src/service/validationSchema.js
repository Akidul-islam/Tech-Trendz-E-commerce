import * as yup from 'yup';

const registerSchema = yup.object().shape({
  displayName: yup
    .string()
    .required('username is required')
    .min(4, 'username name at least 4 or above '),
  email: yup
    .string()
    .required('Email is required')
    .test('valid-email', 'email will like (example@gmail.com)', (value) => {
      // Regular expression for email validation
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value);
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  phoneNumber: yup.number().required('only number is valid'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   'Password must include at least 1 lowercase , 1 uppercase, 1 number, and one special character'
  // ),

  // .test('valid-image', 'Invalid image format', (value) => {
  //   if (!value) {
  //     // No file uploaded
  //     return false;
  //   }

  //   const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
  //   return allowedFormats.includes(value.type);
  // }),
});

const userLogin = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .test('valid-email', 'email will like (example@gmail.com)', (value) => {
      // Regular expression for email validation
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value);
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export { registerSchema, userLogin };
