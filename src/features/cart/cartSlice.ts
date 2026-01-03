import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "./Cart";

interface CartState {
  cart: Cart[];
}

const INITIAL_STATE: CartState = {
  cart: [],
};

export type Actions = {
  type: string;
  payload: Cart;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    addItem(state, action: Actions) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      console.log(action, "action");

      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item?.quantity) {
        item.quantity++;
      }
      if (item?.totalPrice) {
        item.totalPrice += item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item?.quantity) {
        item.quantity--;
      }
      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action); // call deleteItem reducer inside decreaseItemQuantity

      if (item?.totalPrice) {
        item.totalPrice -= item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: { cart: CartState }) => state.cart.cart;

export const getTotalCartQuantity = (state: { cart: CartState }) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
export const getTotalCartPrice = (state: { cart: CartState }) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getCurrentQuantityById =
  (id: number) => (state: { cart: CartState }) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity || 0;
