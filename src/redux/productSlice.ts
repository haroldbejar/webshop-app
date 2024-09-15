import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "../endPoints/endPoint";
import axios from "axios";

interface Product {
  productId: number;
  productCode: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}

interface PaginationData {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

interface ProductState {
  items: Product[];
  paginationObj: PaginationData;
  status: "initial" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Estado inicial tipado
const initialState: ProductState = {
  items: [],
  paginationObj: {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
  },
  status: "initial",
  error: null,
};

// Thunks tipados
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page: number) => {
    const url = `${endPoints.product.list}/${page}/10`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async ({ categoryId, page }: { categoryId: number; page: number }) => {
    const url = `${endPoints.product.listByCategory}/${categoryId}/${page}/10`;
    const response = await axios.get(url);
    return response.data;
  }
);

// Slice tipado
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.items = action.payload.products.$values;
        state.paginationObj = action.payload.paginationData || {
          totalCount: 0,
          pageSize: 10,
          currentPage: 1,
          totalPages: 1,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductsByCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.items = action.payload.productsCategory.$values;
          state.paginationObj = action.payload.paginationData || {
            totalCount: 0,
            pageSize: 10,
            currentPage: 1,
            totalPages: 1,
          };
        }
      )
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default productSlice.reducer;
