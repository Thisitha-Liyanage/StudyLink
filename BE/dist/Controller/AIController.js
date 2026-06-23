"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeNote = exports.chatWithAI = void 0;
const AIService_1 = require("../Service/AIService");
const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                message: "Message is required",
            });
        }
        const reply = await (0, AIService_1.askAI)(message);
        res.status(200).json({
            reply,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "AI Error",
        });
    }
};
exports.chatWithAI = chatWithAI;
const summarizeNote = async (req, res) => {
    console.log("SummarizeNote called");
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                message: "Content is required",
            });
        }
        const prompt = `Summarize the following note in simple points:\n\n${message}`;
        const summary = await (0, AIService_1.askAI)(prompt);
        res.status(200).json({
            summary,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Summarize failed",
        });
    }
};
exports.summarizeNote = summarizeNote;
