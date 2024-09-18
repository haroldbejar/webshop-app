import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "../endPoints/endPoint";
import { setError } from "./errorSlice";
import axios from "axios";

interface Customer {
  customerId: number;
  name: string;
  email: string;
  address: string;
}

interface CustomerState {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customer: null,
  loading: false,
  error: null,
};

export const createCustomer = createAsyncThunk<
  Customer,
  Omit<Customer, "customerId">
>("customer/createCustomer", async (newCustomer, { dispatch }) => {
  try {
    const url = `${endPoints.customer.base}`;
    const response = await axios.post(url, newCustomer);
    return response.data;
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  }
});

export const fetchCustomer = createAsyncThunk(
  "customer/fetchCustomerById",
  async (customerId: number, { dispatch }) => {
    try {
      const url = `${endPoints.customer.byUserId}/${customerId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fetchCustomerStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerSuccess(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
      state.loading = false;
    },
    fetchCustomerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateCustomer(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.customer = action.payload;
          state.loading = false;
        }
      )
      .addCase(createCustomer.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create customer";
        state.loading = false;
      })
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.customer = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch customer";
        state.loading = false;
      });
  },
});

export const {
  fetchCustomerStart,
  fetchCustomerSuccess,
  fetchCustomerFailure,
  updateCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
