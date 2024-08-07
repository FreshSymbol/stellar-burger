import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginApi, registrationApi, logoutApi, updateUserApi } from './actions';

type TInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error?: string | null;
};

export const initialState: TInitialState = {
  user: null,
  isAuthChecked: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<TUser>) => {
      state.user = actions.payload;
    },
    setIsAuthChecked: (state, actions: PayloadAction<boolean>) => {
      state.isAuthChecked = actions.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationApi.pending, (state) => {
        state.error = null;
      })
      .addCase(registrationApi.rejected, (state, actions) => {
        state.error = actions.error.message;
      })
      .addCase(registrationApi.fulfilled, (state, actions) => {
        state.isAuthChecked = true;
        state.user = actions.payload;
      })

      .addCase(loginApi.pending, (state) => {
        state.error = null;
      })
      .addCase(loginApi.rejected, (state, actions) => {
        state.isAuthChecked = true;
        state.error = actions.error.message;
      })
      .addCase(loginApi.fulfilled, (state, actions) => {
        state.isAuthChecked = true;
        state.user = actions.payload;
      })

      .addCase(logoutApi.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutApi.rejected, (state, actions) => {
        state.error = actions.error.message;
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(updateUserApi.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserApi.rejected, (state, actions) => {
        state.error = actions.error.message;
      })
      .addCase(updateUserApi.fulfilled, (state, actions) => {
        state.user = actions.payload.user;
      });
  }
});

export const { setUser, setIsAuthChecked } = authSlice.actions;
export const { getUser, getIsAuthChecked } = authSlice.selectors;
export default authSlice.reducer;
