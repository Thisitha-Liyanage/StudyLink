import { Request, Response } from "express";
import { searchUsers } from "../Service/UserService";
import { getNotesByUserService } from "../Service/NoteService";
import { AuthRequest } from "../Middleware/auth";

export const searchUsersService = async (
  req: Request,
  res: Response
) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const users = await searchUsers(
      username as string
    );

    res.status(200).json(users);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to search users",
    });
  }
};

export const getMyNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const notes = await getNotesByUserService(userId);

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};