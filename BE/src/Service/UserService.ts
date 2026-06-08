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

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId).select("-password");
  return user;
};

export const updateUserById = async (userId: string, data: any) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      username: data.username,
      contactNumber: data.contactNumber, 
      university: data.university,
      bio: data.bio,
      profilePic: data.profilePic,
    },
    { new: true }
  ).select("-password");

  return updatedUser;
};
