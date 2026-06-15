import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { searchUsers } from "../../service/userService";

export const searchUsersThunk = createAsyncThunk(
  "users/search",
  async (username: string) => {
    return await searchUsers(username);
  }
);

type UserState = {
  searchResults: any[];
  loading: boolean;
};

const initialState: UserState = {
  searchResults: [],
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchUsersThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        searchUsersThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )

      .addCase(searchUsersThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;