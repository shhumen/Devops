import { combineReducers } from "@reduxjs/toolkit";
import categorySlice from "../features/categories/categorySlice";
import productSlice from "../features/products/productSlice";
import authSlice from "../features/auth/authSlice";
import usersSlice from "../features/users/usersSlice";
import roleSlice from "../features/roles/roleSlice";

const rootReducer = combineReducers({
  category: categorySlice,
  product: productSlice,
  auth: authSlice,
  users: usersSlice,
  roles:roleSlice
});

export default rootReducer;
