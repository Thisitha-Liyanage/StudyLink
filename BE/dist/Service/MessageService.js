"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatListService = exports.getReceivedMessagesService = exports.getSentMessagesService = exports.sendMessageService = void 0;
const Message_1 = __importDefault(require("../Models/Message"));
const User_1 = require("../Models/User");
const sendMessageService = async (senderId, receiverId, message) => {
    const conversationId = senderId < receiverId
        ? `${senderId}_${receiverId}`
        : `${receiverId}_${senderId}`;
    const newMessage = await Message_1.default.create({
        conversationId,
        senderId,
        receiverId,
        message,
    });
    return newMessage;
};
exports.sendMessageService = sendMessageService;
const getSentMessagesService = async (userId) => {
    return await Message_1.default.find({
        senderId: userId,
    }).sort({ createdAt: -1 });
};
exports.getSentMessagesService = getSentMessagesService;
const getReceivedMessagesService = async (userId) => {
    return await Message_1.default.find({
        receiverId: userId,
    }).sort({ createdAt: -1 });
};
exports.getReceivedMessagesService = getReceivedMessagesService;
const getChatListService = async (userId) => {
    const messages = await Message_1.default.find({
        $or: [
            { senderId: userId },
            { receiverId: userId }
        ]
    }).sort({ createdAt: -1 });
    const chats = [];
    const processedUsers = new Set();
    for (const msg of messages) {
        const otherUserId = msg.senderId.toString() === userId
            ? msg.receiverId.toString()
            : msg.senderId.toString();
        if (processedUsers.has(otherUserId))
            continue;
        processedUsers.add(otherUserId);
        const user = await User_1.UserModel.findById(otherUserId).select("username profilePic university");
        chats.push({
            userId: otherUserId,
            username: user?.username,
            profilePic: user?.profilePic,
            university: user?.university,
            lastMessage: msg.message,
            conversationId: msg.conversationId,
        });
    }
    return chats;
};
exports.getChatListService = getChatListService;
