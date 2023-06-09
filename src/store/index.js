import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice";
import productsSlice from "./productsSlice";

const rootReducer = combineReducers({
  products: productsSlice,
  cart: cartSlice,
  favorite: favoriteSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;