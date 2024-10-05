import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  // cart: [],
  cart: [
    {
      pizzaId: 1,
      name: "Vegetale",
      quantity: 1,
      unitPrice: 13,
      totalPrice: 13,
    },
  ]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload.id)
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload.id)

      if (item?.quantity) {
        item.quantity++;
      }
      if (item?.totalPrice) {
        item.totalPrice += item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload.id)
      if (item?.quantity) {
        item.quantity--;
      }
      if (item?.totalPrice) {
        item.totalPrice -= item.unitPrice;
      }

    },
    clearCart(state) {
      state.cart = []
    }
  }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer