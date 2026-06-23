"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyNotes = exports.searchUsersService = void 0;
const UserService_1 = require("../Service/UserService");
const NoteService_1 = require("../Service/NoteService");
const searchUsersService = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({
                message: "Username is required",
            });
        }
        const users = await (0, UserService_1.searchUsers)(username);
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to search users",
        });
    }
};
exports.searchUsersService = searchUsersService;
const getMyNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await (0, NoteService_1.getNotesByUserService)(userId);
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch notes" });
    }
};
exports.getMyNotes = getMyNotes;
