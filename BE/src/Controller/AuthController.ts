import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { saveUser } from "../Service/UserService";
import { UserModel } from "../Models/User";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;


export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      contactNumber,
    } = req.body;

    if (!username || !email || !password || !contactNumber) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await saveUser({
      username,
      email,
      password,
      contactNumber,
    });

    res.status(201).json({
      message: "Student registered successfully",
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   LOGIN
========================= */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3. create token (ONLY userId inside)
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

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

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};