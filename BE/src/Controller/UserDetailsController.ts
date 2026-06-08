import { Response } from "express";
import { updateUserById } from "../Service/UserService";
import { UserModel } from "../Models/User";

export const getMyProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // ✅ FIXED

    console.log("User ID from token:", userId);

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMyProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // ✅ FIXED

    const updatedUser = await updateUserById(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};