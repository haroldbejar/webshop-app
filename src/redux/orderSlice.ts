import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endPoints from "../endPoints/endPoint";
import axios from "axios";
import { setError } from "./errorSlice";

export interface OrderDetails {
  productId: number;
  quantity: number;
  price: number;
}
export interface Order {
  orderId?: number;
  customerId: number;
  description: string;
  orderDate: Date;
  orderDetails: OrderDetails[];
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order: Order, { dispatch }) => {
    try {
      const response = await axios.post(endPoints.order.createDetails, order);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
