import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endPoints from "../endPoints/endPoint";
import axios from "axios";
import { setError } from "./errorSlice";

export interface Order {
  customerId: number;
  description: string;
  orderDate: Date;
}

export interface OrderDetails {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderDetailsViewModel {
  order: Order | null;
  orderDetails: OrderDetails[] | null;
}

interface OrderPaymentState {
  order: Order | null;
  orderDetails: OrderDetails[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderPaymentState = {
  order: null,
  orderDetails: null,
  loading: false,
  error: null,
};

export const createOrderPaymentAndDetials = createAsyncThunk(
  "orderPayment/createOrderPaymentAndDetials",
  async (orderDetailsViewModel: OrderDetailsViewModel, { dispatch }) => {
    try {
      const url = `${endPoints.order.createDetails}`;
      const response = await axios.post(url, orderDetailsViewModel);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(setError(errorMessage));
    }
  }
);

const orderSlice = createSlice({
  name: "orderPayment",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orderDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderPaymentAndDetials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderPaymentAndDetials.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.orderDetails = action.payload.orderDetails;
      })
      .addCase(createOrderPaymentAndDetials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
