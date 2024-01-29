import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import categoryReducer from "./categorySlice"
import cartReducer from "./cartSlice"
import pizzaReducer from "./pizzaSlice"

export default configureStore({
  reducer: {
    search: searchReducer,
    category: categoryReducer,
    cart: cartReducer,
    pizza: pizzaReducer
  },
});
