import express from "express";
import { registerUser } from "../Controller/AuthController";

const router = express.Router();

router.post("/register", registerUser);

export default router;