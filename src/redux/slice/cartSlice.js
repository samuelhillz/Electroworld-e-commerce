import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalqty: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_To_Cart: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeProduct: (state, action) => {
      const tempProduct = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.cartItems = tempProduct;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    cartReset: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    subTotal: (state, action) => {
      const newArray = [];
      const tempProduct = state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        console.log(cartItemAmount);
        return newArray.push(cartItemAmount);
      });
      const totalAmount = newArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    totalQuantity: (state, action) => {
      const newArray = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;

        return newArray.push(quantity);
      });
      const totalQuantity = newArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalqty = totalQuantity;
    },
  },
});

export const {
  totalQuantity,
  add_To_Cart,
  cartReset,
  subTotal,
  DECREASE_CART,
  removeProduct,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQty = (state) => state.cart.cartTotalqty;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
