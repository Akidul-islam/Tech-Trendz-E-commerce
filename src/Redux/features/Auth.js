// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authSdk } from '../../service/api/auth';
import { onAuthStateChanged } from 'firebase/auth';

export const API = {
  signupUser: createAsyncThunk('auth/signup', async (data, thunkAPI) => {
    try {
      const results = await authSdk.register(data);
      // You can customize the user data and update it to Firestore here if needed
      const user = await authSdk.getDocById('Users', results.uid);
      return user;
    } catch (error) {
      error.message = 'email/password already exits';
      return thunkAPI.rejectWithValue(error.message);
    }
  }),
  loginUser: createAsyncThunk('auth/login', async (creadiential, thunkAPI) => {
    try {
      const result = await authSdk.login(
        creadiential.email,
        creadiential.password
      );
      const user = await authSdk.getDocById('Users', result.uid);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }),

  getUser: createAsyncThunk('auth/getUser', async (data, thunkAPI) => {
    // let user;
    try {
      // await setPersistence(authSdk.auth, browserSessionPersistence);
      const results = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(authSdk.auth, (user) => {
          unsubscribe(); // Unsubscribe after receiving the user object
          if (user) {
            resolve(user);
          } else {
            reject(new Error('User not found'));
          }
        });
      });
      const user = await authSdk.getDocById('Users', results.uid);
      return user;
    } catch (error) {
      error.message = 'user doesnt found';
      return thunkAPI.rejectWithValue(error.message);
    }
  }),

  logOutUser: createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
      await authSdk.logOut();
      return null;
    } catch (error) {
      console.log(error.message);
      error.message = 'Something going wrong try again';
      return thunkAPI.rejectWithValue(error.message);
    }
  }),
};

const initialState = {
  isAuthenticate: true,
  tempUser: null,
  user: {
    name: 'Md. Akidul Islam',
    email: 'Akidul islam',
    phoneNumber: '0173456892',
    photoURL:
      'https://downloadr2.apkmirror.com/wp-content/uploads/2020/06/19/5ef4ca6f76dfa.png',
    roles: 'admin',
  },
  isLoading: false,
  isSuccess: false,
  isLogout: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    closeMessage: (state) => {
      state.isSuccess = false;
      state.isError = null;
      state.isLogout = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(API.signupUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API.signupUser.fulfilled, (state, action) => {
        state.tempUser = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(API.signupUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = false;
        state.isError = action.payload;
      })
      .addCase(API.loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(API.loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
        state.isSuccess = true;
      })
      .addCase(API.loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(API.logOutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API.logOutUser.fulfilled, (state) => {
        state.isLogout = true;
        state.isAuthenticate = false;
        state.user = null;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(API.logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(API.getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API.getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(API.getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.paylaod;
      });
  },
});

export const { login, logout, closeMessage, showError } = authSlice.actions;
export default authSlice.reducer;
