import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import endPoints from "../endPoints/endPoint";
import { setError } from "./errorSlice";
import axios from "axios";

interface AuthState {
  token: string | null;
  username: string | null;
  userId: number | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
  userId: null,
  role: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: { userName: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post(
        endPoints.authentication.login,
        formData
      );
      const { token, userName, id, role } = response.data;
      localStorage.setItem("token", token);
      return { username: userName, userId: id, role };
    } catch (error: any) {
      dispatch(setError(error));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.userId = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
