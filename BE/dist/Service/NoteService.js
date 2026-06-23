"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesByUserService = exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotesByUserId = exports.createNote = void 0;
const Note_1 = __importDefault(require("../Models/Note"));
const createNote = async (userId, title, content) => {
    const note = new Note_1.default({
        userId,
        title,
        content,
    });
    return await note.save();
};
exports.createNote = createNote;
const getNotesByUserId = async (userId) => {
    return await Note_1.default.find({ userId })
        .sort({ createdAt: -1 });
};
exports.getNotesByUserId = getNotesByUserId;
const getNoteById = async (id) => {
    return await Note_1.default.findById(id);
};
exports.getNoteById = getNoteById;
const updateNote = async (id, title, content) => {
    return await Note_1.default.findByIdAndUpdate(id, { title, content }, { new: true });
};
exports.updateNote = updateNote;
const deleteNote = async (id) => {
    return await Note_1.default.findByIdAndDelete(id);
};
exports.deleteNote = deleteNote;
const getNotesByUserService = async (userId) => {
    return await Note_1.default.find({ userId })
        .sort({ updatedAt: -1 });
};
exports.getNotesByUserService = getNotesByUserService;
