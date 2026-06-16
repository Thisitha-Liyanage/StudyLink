import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import notesReducer from "./slices/notesslice";
import aiReducer from "./slices/AISlice";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/MessageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    ai: aiReducer, 
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;