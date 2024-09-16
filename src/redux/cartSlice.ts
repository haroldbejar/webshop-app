import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: number;
  productCode: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description: string;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingProduct = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: number; type: "decrease" | "remove" }>
    ) => {
      const { id, type } = action.payload;
      if (type === "decrease") {
        const product = state.cart.find((item) => item.productId === id);
        if (product) {
          product.quantity -= 1;
          if (product.quantity === 0) {
            state.cart = state.cart.filter((item) => item.productId !== id);
          }
        }
      } else if (type === "remove") {
        state.cart = state.cart.filter((item) => item.productId !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
