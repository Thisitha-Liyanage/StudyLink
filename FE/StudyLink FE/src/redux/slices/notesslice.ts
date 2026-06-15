// src/redux/slices/notesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";

export type Note = {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  pages?: number;
};

type NotesState = {
  notes: Note[];
  loading: boolean;
};

const initialState: NotesState = {
  notes: [],
  loading: false,
};

// GET NOTES
export const fetchNotes = createAsyncThunk("notes/fetch", async () => {
  const res = await api.get("/notes");
  return res.data;
});

// CREATE NOTE
export const createNote = createAsyncThunk(
  "notes/create",
  async (data: { title: string; content: string }) => {
    const res = await api.post("/notes", data);
    return res.data;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })

      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      });
  },
});


/* GET BY ID */
export const fetchNoteById = createAsyncThunk(
  "notes/fetchById",
  async (id: string) => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  }
);

/* UPDATE NOTE */
export const updateNoteThunk = createAsyncThunk(
  "notes/update",
  async ({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) => {
    const res = await api.put(`/notes/${id}`, {
      title,
      content,
    });
    return res.data;
  }
);

/* DELETE NOTE */
export const deleteNoteThunk = createAsyncThunk(
  "notes/delete",
  async (id: string) => {
    await api.delete(`/notes/${id}`);
    return id;
  }
);

export default notesSlice.reducer;