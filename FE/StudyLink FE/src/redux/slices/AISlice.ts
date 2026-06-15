import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";

/* ---------------- TYPES ---------------- */

type Message = {
  role: "user" | "ai";
  text: string;
};

type AIState = {
  messages: Message[];
  loading: boolean;

  summary: string | null;
  summaryLoading: boolean;
};

/* ---------------- INITIAL STATE ---------------- */

const initialState: AIState = {
  messages: [],
  loading: false,

  summary: null,
  summaryLoading: false,
};

/* ---------------- CHAT THUNK ---------------- */

export const askAIThunk = createAsyncThunk(
  "ai/ask",
  async (message: string) => {
    const res = await api.post("/ai/chat", { message });

    return {
      user: message,
      ai: res.data.reply,
    };
  }
);

/* ---------------- SUMMARIZE THUNK ---------------- */

export const summarizeNoteThunk = createAsyncThunk(
  "ai/summarize",
  async (content: string) => {
    const res = await api.post("/ai/summarize", {
      message: content,
    });

    return res.data.summary as string;
  }
);

/* ---------------- SLICE ---------------- */

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
    },

    clearSummary: (state) => {
      state.summary = null;
    },
  },

  extraReducers: (builder) => {
    /* ================= CHAT ================= */

    builder
      .addCase(askAIThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(askAIThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push(
          {
            role: "user",
            text: action.payload.user,
          },
          {
            role: "ai",
            text: action.payload.ai,
          }
        );
      })

      .addCase(askAIThunk.rejected, (state) => {
        state.loading = false;
      });

    /* ================= SUMMARIZE ================= */

    builder
      .addCase(summarizeNoteThunk.pending, (state) => {
        state.summaryLoading = true;
      })

      .addCase(summarizeNoteThunk.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })

      .addCase(summarizeNoteThunk.rejected, (state) => {
        state.summaryLoading = false;
      });
  },
});

/* ---------------- EXPORTS ---------------- */

export const { clearChat, clearSummary } = aiSlice.actions;
export default aiSlice.reducer;