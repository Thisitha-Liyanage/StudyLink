"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.GROQ_API_KEY;
console.log("GROQ KEY:", API_KEY);
const askAI = async (message) => {
    try {
        const response = await axios_1.default.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.choices[0].message.content;
    }
    catch (error) {
        console.error(error.response?.data || error.message);
        console.log("GROQ FULL ERROR:");
        console.log(error.response?.data);
        console.log(error.message);
        throw new Error("AI Error");
        throw new Error("AI Error");
    }
};
exports.askAI = askAI;
