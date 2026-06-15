import { Request, Response } from "express";
import { askAI } from "../Service/AIService";

export const chatWithAI = async (
  req: Request,
  res: Response
) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const reply = await askAI(message);

    res.status(200).json({
      reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};


export const summarizeNote = async (req: Request, res: Response) => {
  console.log("SummarizeNote called");
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const prompt = `Summarize the following note in simple points:\n\n${message}`;

    const summary = await askAI(prompt);

    res.status(200).json({
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Summarize failed",
    });
  }
};