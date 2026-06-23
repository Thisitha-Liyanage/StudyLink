"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AIController_1 = require("../Controller/AIController");
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
router.post("/chat", auth_1.authenticate, AIController_1.chatWithAI);
router.post("/summarize", auth_1.authenticate, AIController_1.summarizeNote);
exports.default = router;
