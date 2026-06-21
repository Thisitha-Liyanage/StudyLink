import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import { UserModel, UserRole } from "../Models/User";

export const adminOnly = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const user = await UserModel.findById(req.user.id);

    console.log("Token User ID:", req.user.id);
    console.log("DB User:", user);

    if (!user || user.role !== UserRole.ADMIN) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    next();
};