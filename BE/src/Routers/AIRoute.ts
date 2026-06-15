import express from "express";
import { chatWithAI, summarizeNote } from "../Controller/AIController";
import { authenticate } from "../Middleware/auth";

const router = express.Router();

router.post("/chat", authenticate, chatWithAI);
router.post("/summarize", authenticate, summarizeNote);

export default router;