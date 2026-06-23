"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.editNote = exports.getSingleNote = exports.getMyNotes = exports.addNote = void 0;
const NoteService_1 = require("../Service/NoteService");
// save note 
const addNote = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { title, content } = req.body;
        const note = await (0, NoteService_1.createNote)(userId, title, content);
        res.status(201).json(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create note",
        });
    }
};
exports.addNote = addNote;
// get all notes 
const getMyNotes = async (req, res) => {
    try {
        const userId = req.user?.id;
        const notes = await (0, NoteService_1.getNotesByUserId)(userId);
        res.json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get notes",
        });
    }
};
exports.getMyNotes = getMyNotes;
// get note by id 
const getSingleNote = async (req, res) => {
    try {
        const noteId = String(req.params.id);
        const note = await (0, NoteService_1.getNoteById)(noteId);
        if (!note) {
            res.status(404).json({
                message: "Note not found",
            });
            return;
        }
        res.json(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get note",
        });
    }
};
exports.getSingleNote = getSingleNote;
// update note
const editNote = async (req, res) => {
    try {
        const noteId = String(req.params.id);
        const { title, content } = req.body;
        const note = await (0, NoteService_1.updateNote)(noteId, title, content);
        if (!note) {
            res.status(404).json({
                message: "Note not found",
            });
            return;
        }
        res.json(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update note",
        });
    }
};
exports.editNote = editNote;
// delete note 
const removeNote = async (req, res) => {
    try {
        const noteId = String(req.params.id);
        const deleted = await (0, NoteService_1.deleteNote)(noteId);
        if (!deleted) {
            res.status(404).json({
                message: "Note not found",
            });
            return;
        }
        res.json({
            message: "Note deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete note",
        });
    }
};
exports.removeNote = removeNote;
