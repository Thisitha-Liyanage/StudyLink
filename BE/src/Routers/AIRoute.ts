import express from "express";
import { chatWithAI } from "../Controller/AIController";
import { authenticate } from "../Middleware/auth";

const router = express.Router();

router.post(
  "/chat",
  authenticate,
  chatWithAI
);

export default router;