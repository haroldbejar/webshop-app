import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "../endPoints/endPoint";
import axios from "axios";

interface Category {
  categoryId: number;
  name: string;
}

interface AsideState {
  categories: Category[];
  status: "initial" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AsideState = {
  categories: [],
  status: "initial",
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async () => {
    try {
      const url = `${endPoints.category.list}/1/10`; // TODO: parametros quemados, pasar a variables
      const response = await axios.get(url);
      return response.data.categories;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

// Slice de aside
const asideSlice = createSlice({
  name: "aside",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export default asideSlice.reducer;
