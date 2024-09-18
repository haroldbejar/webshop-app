import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import asideReducer from "./asideSlice";
import cartReducer from "./cartSlice";
import customerReducer from "./customerSlice";
import errorReducer from "./errorSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    aside: asideReducer,
    cart: cartReducer,
    error: errorReducer,
    customer: customerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
