import express from "express";
import {
    sendMessage,
    getConversation,
    getChatList,
} from "../Controller/MessageController";
import { authenticate } from "../Middleware/auth";

const router = express.Router();

router.post("/send", authenticate, sendMessage);

router.get("/conversation/:receiverId", authenticate, getConversation);

router.get("/chat-list", authenticate, getChatList);

export default router;