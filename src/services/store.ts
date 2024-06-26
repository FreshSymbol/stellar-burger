import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ordersSliceReducer from './slices/orders/ordersSlice';
import ingredientsSliceReducer from './slices/ingredients/ingredientsSlice';
import authSliceReducer from './slices/auth/authSlice';

const rootReducer = combineReducers({
  orders: ordersSliceReducer,
  ingredients: ingredientsSliceReducer,
  auth: authSliceReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
