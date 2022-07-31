import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import categoriesSlice from "./categoriesSlice";
import favoriteSlice from "./favoriteSlice";
import productsSlice from "./productsSlice";

const rootReducer = combineReducers({
  categories: categoriesSlice,
  products: productsSlice,
  cart: cartSlice,
  favorite: favoriteSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;