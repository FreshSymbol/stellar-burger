import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi as fetchLogout,
  registerUserApi,
  updateUserApi as fetchUpdateUser
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { setIsAuthChecked, setUser } from './authSlice';

export const registrationApi = createAsyncThunk(
  'auth/registrationApi',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginApi = createAsyncThunk(
  'auth/loginApi',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const logoutApi = createAsyncThunk('auth/logoutApi', async () => {
  const res = await fetchLogout();
  if (res.success) {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
});

export const userApi = createAsyncThunk('auth/userApi', async () => {
  const res = await getUserApi();
  if (!res.success) {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
  return res.user;
});

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else dispatch(setIsAuthChecked(true));
  }
);

export const updateUserApi = createAsyncThunk(
  'auth/updateUserApi',
  async (user: Partial<TRegisterData>) => fetchUpdateUser(user)
);
