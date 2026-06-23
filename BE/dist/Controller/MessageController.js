"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatList = exports.getConversation = exports.sendMessage = void 0;
const MessageService_1 = require("../Service/MessageService");
const Message_1 = __importDefault(require("../Models/Message"));
const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId, message } = req.body;
        const result = await (0, MessageService_1.sendMessageService)(senderId, receiverId, message);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to send message",
        });
    }
};
exports.sendMessage = sendMessage;
const getConversation = async (req, res) => {
    try {
        const userId = req.user.id; // from token
        const receiverId = req.params.receiverId;
        const messages = await Message_1.default.find({
            $or: [
                { senderId: userId, receiverId },
                { senderId: receiverId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch conversation" });
    }
};
exports.getConversation = getConversation;
const getChatList = async (req, res) => {
    try {
        const userId = req.user.id;
        const chats = await (0, MessageService_1.getChatListService)(userId);
        res.status(200).json(chats);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get chat list" });
    }
};
exports.getChatList = getChatList;
