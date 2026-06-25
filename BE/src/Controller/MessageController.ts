import { Response } from "express";
import { AuthRequest } from "../Middleware/auth";
import {
    getChatListService,
    sendMessageService,
} from "../Service/MessageService";
import Message from "../Models/Message";

// 📤 SEND MESSAGE
export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const senderId = req.user.id;
        const { receiverId, message } = req.body;

        if (!receiverId || !message) {
            return res.status(400).json({ message: "Receiver ID and message content are required" });
        }

        const result = await sendMessageService(
            senderId,
            receiverId,
            message
        );

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error in sendMessage controller:", error);
        return res.status(500).json({
            message: "Failed to send message",
        });
    }
};

// 📌 GET CONVERSATION
export const getConversation = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id; // current logged-in user id
        const receiverId = req.params.receiverId;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID parameter is required" });
        }

        // Fetches all messages between both users in order
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getConversation controller:", error);
        return res.status(500).json({ message: "Failed to fetch conversation" });
    }
};

// 📂 GET CHAT LIST
export const getChatList = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;

        const chats = await getChatListService(userId);

        return res.status(200).json(chats);
    } catch (err) {
        console.error("Error in getChatList controller:", err);
        return res.status(500).json({ message: "Failed to get chat list" });
    }
};