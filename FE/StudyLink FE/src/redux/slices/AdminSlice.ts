import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getAllUsers,
    getDashboardStats,
} from "../../service/AdminService";

export const getAllUsersThunk = createAsyncThunk(
    "admin/getAllUsers",
    async () => {
        return await getAllUsers();
    }
);

export const getDashboardStatsThunk = createAsyncThunk(
    "admin/dashboardStats",
    async () => {
        return await getDashboardStats();
    }
);

interface AdminState {
    users: any[];
    userCount: number;
    noteCount: number;
    loading: boolean;
}

const initialState: AdminState = {
    users: [],
    userCount: 0,
    noteCount: 0,
    loading: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // USERS
            .addCase(getAllUsersThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsersThunk.rejected, (state) => {
                state.loading = false;
            })

            // DASHBOARD STATS
            .addCase(getDashboardStatsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboardStatsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userCount = action.payload.userCount;
                state.noteCount = action.payload.noteCount;
            })
            .addCase(getDashboardStatsThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default adminSlice.reducer;