import { Response } from "express";
import { AuthRequest } from "../Middleware/auth";
import {
    getChatListService,
    sendMessageService,
} from "../Service/MessageService";
import Message from "../Models/Message";

export const sendMessage = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const senderId = req.user.id;
        const { receiverId, message } = req.body;

        const result = await sendMessageService(
            senderId,
            receiverId,
            message
        );

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to send message",
        });
    }
};

export const getConversation = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id; // from token
        const receiverId = req.params.receiverId;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId },
                { senderId: receiverId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch conversation" });
    }
};


export const getChatList = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;

        const chats = await getChatListService(userId);

        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: "Failed to get chat list" });
    }
};