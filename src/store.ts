import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cardReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cardReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store