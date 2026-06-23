"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MessageController_1 = require("../Controller/MessageController");
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
router.post("/send", auth_1.authenticate, MessageController_1.sendMessage);
router.get("/conversation/:receiverId", auth_1.authenticate, MessageController_1.getConversation);
router.get("/chat-list", auth_1.authenticate, MessageController_1.getChatList);
exports.default = router;
