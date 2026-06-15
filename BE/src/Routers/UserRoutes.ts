import express from "express";
import { loginUser, registerUser } from "../Controller/AuthController";
import { getMyProfile, updateMyProfile } from "../Controller/UserDetailsController";
import { authenticate } from "../Middleware/auth";
import { searchUsersService } from "../Controller/DashBoardController";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authenticate, getMyProfile);
router.put("/me", authenticate , updateMyProfile);
router.get("/search", authenticate, searchUsersService);

export default router;