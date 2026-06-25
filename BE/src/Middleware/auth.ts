import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoDB from "../config/db"; 

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: any;
}

// 2. MAKE THIS FUNCTION 'async'
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = {
      id: decoded.id || decoded.userId || decoded._id,
    };

    // 3. FORCE VERCEL TO WAIT FOR MONGO BEFORE MOVING TO THE ROUTE HANDLER
    await mongoDB();

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};