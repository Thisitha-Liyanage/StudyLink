import bcrypt from "bcryptjs";
import { UserModel, UserRole } from "../Models/User";

export const saveUser = async (user: any) => {
  const {
    username,
    email,
    password,
    contactNumber,
  } = user;

  const exUser = await UserModel.findOne({ email });

  if (exUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    contactNumber,

    role: UserRole.STUDENT,

    profilePic: "",
    bio: "",
    university: "",
    skills: [],
  });

  return await newUser.save();
};