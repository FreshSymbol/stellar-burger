import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ordersApi = createAsyncThunk('orders/ordersApi', async () =>
  getOrdersApi()
);

export const feedsApi = createAsyncThunk('orders/feedsApi', async () =>
  getFeedsApi()
);

export const createOrderApi = createAsyncThunk(
  'orders/createOrderApi',
  async (data: string[]) => orderBurgerApi(data)
);
