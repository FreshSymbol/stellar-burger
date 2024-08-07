import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrderApi, feedsApi, ordersApi } from './actions';
import { TFeedsResponse } from '@api';
import { To } from 'react-router-dom';

type TinitialState = {
  orders: TOrder[];
  error?: string | null;
  feeds: TFeedsResponse;
  orderData?: TOrder | null;
  newOrderData: TOrder | null;
  orderRequest: boolean;
};

export const initialState: TinitialState = {
  orders: [],
  error: null,
  feeds: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderData: null,
  newOrderData: null,
  orderRequest: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderData: (state, actions: PayloadAction<TOrder>) => {
      state.orderData = actions.payload;
    },
    setOrderRequest: (state, actions: PayloadAction<boolean>) => {
      state.orderRequest = actions.payload;
    },
    resetNewOrderData: (state) => {
      state.newOrderData = null;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getFeeds: (state) => state.feeds,
    getAllOrders: (state) => state.feeds?.orders,
    getOrderData: (state) => state.orderData,
    getOrderRequest: (state) => state.orderRequest,
    getNewOrderData: (state) => state.newOrderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordersApi.pending, (state) => {
        state.error = null;
      })
      .addCase(ordersApi.rejected, (state, actions) => {
        state.error = actions.error.message;
      })
      .addCase(ordersApi.fulfilled, (state, actions) => {
        state.orders = actions.payload;
      })

      .addCase(feedsApi.pending, (state) => {
        state.error = null;
      })
      .addCase(feedsApi.rejected, (state, actions) => {
        state.error = actions.error.message;
      })
      .addCase(feedsApi.fulfilled, (state, actions) => {
        state.feeds = actions.payload;
      })

      .addCase(createOrderApi.pending, (state) => {
        state.error = null;
      })
      .addCase(createOrderApi.rejected, (state, actions) => {
        state.error = actions.error.message;
      })
      .addCase(createOrderApi.fulfilled, (state, actions) => {
        state.newOrderData = actions.payload.order;
      });
  }
});
export const { setOrderData, setOrderRequest, resetNewOrderData } =
  ordersSlice.actions;
export const {
  getFeeds,
  getOrders,
  getAllOrders,
  getOrderData,
  getOrderRequest,
  getNewOrderData
} = ordersSlice.selectors;
export default ordersSlice.reducer;
