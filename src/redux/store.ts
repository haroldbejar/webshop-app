import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import asideReducer from "./asideSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    aside: asideReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
