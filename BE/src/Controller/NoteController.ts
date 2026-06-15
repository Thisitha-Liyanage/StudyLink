import { Response } from "express";
import { AuthRequest } from "../Middleware/auth";
import { askAI } from "../Service/AIService";
import { asyncHandler } from "../Utils/asyncHandler";
import {
  createNote,
  getNoteById,
  getNotesByUserId,
  updateNote,
  deleteNote,
} from "../Service/NoteService";

// save note 
export const addNote = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { title, content } = req.body;

    const note = await createNote(
      userId,
      title,
      content
    );

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create note",
    });
  }
};


// get all notes 
export const getMyNotes = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const notes = await getNotesByUserId(userId);

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get notes",
    });
  }
};


// get note by id 
export const getSingleNote = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const noteId = String(req.params.id);

    const note = await getNoteById(noteId);

    if (!note) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get note",
    });
  }
};

// update note
export const editNote = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const noteId = String(req.params.id);

    const { title, content } = req.body;

    const note = await updateNote(
      noteId,
      title,
      content
    );

    if (!note) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update note",
    });
  }
};


// delete note 
export const removeNote = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const noteId = String(req.params.id);

    const deleted = await deleteNote(noteId);

    if (!deleted) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete note",
    });
  }
};

