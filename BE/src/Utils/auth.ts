import { IUser } from "../Models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// ACCESS TOKEN
export const signAccessToken = (user: IUser): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.role,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: "30m" }

  );
};

// REFRESH TOKEN
export const signRefreshToken = (user: IUser): string => {
  return jwt.sign(
    {
      sub: user._id.toString()
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};