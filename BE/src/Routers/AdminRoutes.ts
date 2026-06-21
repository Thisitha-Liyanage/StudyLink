import express from "express";
import {
  getAllUsers,
  getDashboardStats,
} from "../Controller/AdminController";
import { authenticate } from "../Middleware/auth";
import { adminOnly } from "../Middleware/adminAuth";

const router = express.Router();

router.get(
  "/all",
  authenticate,
  adminOnly,
  getAllUsers
);

router.get(
  "/dashboard",
  authenticate,
  adminOnly,
  getDashboardStats
);

export default router;