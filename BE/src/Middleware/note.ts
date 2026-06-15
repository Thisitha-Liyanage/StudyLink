import multer from "multer";
import type { Request } from "express";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
});