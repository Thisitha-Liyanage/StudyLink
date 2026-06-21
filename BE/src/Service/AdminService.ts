import { UserModel, UserRole } from "../Models/User";
import Note from "../Models/Note";


export const getDashboardStatsService = async () => {
  const userCount = await UserModel.countDocuments({
    role: UserRole.STUDENT,
  });

  const noteCount = await Note.countDocuments();


  return {
    userCount,
    noteCount,
  };
};