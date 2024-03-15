import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./type";
import { UserService } from "../../network/services/UserService";
import Users from "../../network/models/User";
import createBaseSlice from "../../network/reducers/core/BaseSlice";
import { stat } from "fs";

const initialState: UserState = {
  list: [],
  status: "idle",
  error: null,
  selected: null,
};

let userService = new UserService();

export const addUser = createAsyncThunk("auth/addUser", async (user: Users) => {
  const response = await userService.add(user);
  return response.data;
});

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const response = await userService.getAll();
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id: string) => {
    const response = await userService.delete(id); 
    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (id: string) => {
    const response = await userService.get(id);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (user: Users) => {
    const response = await userService.update(user._id, user);
    return response.data;
  }
);

const userSlice = createBaseSlice<UserState>("user", initialState, [
  {
    thunk: fetchUsers,
    onFulfilled: (state, action) => {
      state.list = action.payload;
    },
  },
  {
    thunk: addUser,
    onFulfilled: (state, action) => state.list.push(action.payload),
  },
  {
    thunk: deleteUser,
    onFulfilled: (state, action) => { 
      state.list = state.list.filter((user) => user._id !== action.payload);
    },
  },
  {
    thunk: fetchUser,
    onFulfilled: (state, action) => {
      state.selected = action.payload;
    },
  },
  {
    thunk: updateUser,
    onFulfilled: (state, action) => { 

      state.list = state.list.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
  },
]);

export default userSlice.reducer;
