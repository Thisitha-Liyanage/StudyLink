// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";

type User = {
  username: string;
  email: string;
  contactNumber: string;
  university: string;
  bio: string;
  profilePic: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: false,
};

// GET CURRENT USER
export const fetchMe = createAsyncThunk("auth/me", async () => {
  const res = await api.get("/users/me");
  return res.data;
});

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "auth/update",
  async (data: any) => {
    const res = await api.put("/users/me", data);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;