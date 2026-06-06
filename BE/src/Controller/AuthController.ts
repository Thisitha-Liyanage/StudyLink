import { Request, Response } from "express";
import { saveUser } from "../Service/UserService";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      username,
      email,
      password,
      contactNumber,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !contactNumber
    ) {
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