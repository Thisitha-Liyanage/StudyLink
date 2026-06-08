import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GROQ_API_KEY as string;
console.log("GROQ KEY:", API_KEY);

export const askAI = async (message: string) => {
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        console.log("GROQ FULL ERROR:");
        console.log(error.response?.data);
        console.log(error.message);

        throw new Error("AI Error");

        throw new Error("AI Error");
    }
};