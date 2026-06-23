"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../Service/UserService");
const User_1 = require("../Models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
/* =========================
   REGISTER
========================= */
const registerUser = async (req, res) => {
    try {
        const { username, email, password, contactNumber, } = req.body;
        if (!username || !email || !password || !contactNumber) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const result = await (0, UserService_1.saveUser)({
            username,
            email,
            password,
            contactNumber,
        });
        res.status(201).json({
            message: "Student registered successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.registerUser = registerUser;
/* =========================
   LOGIN
========================= */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. find user
        const user = await User_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        // 2. check password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        // 3. create token (ONLY userId inside)
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        // 4. response (role outside token)
        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.loginUser = loginUser;
