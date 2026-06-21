import { Request, Response } from "express";
import { getAllUsersService } from "../Service/UserService";
import { getDashboardStatsService } from "../Service/AdminService";

export const getAllUsers = async (
    req: Request,
    res: Response
) => {
    try {
        const users = await getAllUsersService();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get users",
        });
    }
};

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await getDashboardStatsService();

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
};