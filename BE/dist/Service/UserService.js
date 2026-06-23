"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersService = exports.searchUsers = exports.updateUserById = exports.getUserById = exports.saveUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../Models/User");
const saveUser = async (user) => {
    const { username, email, password, contactNumber, } = user;
    const exUser = await User_1.UserModel.findOne({ email });
    if (exUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = new User_1.UserModel({
        username,
        email,
        password: hashedPassword,
        contactNumber,
        role: User_1.UserRole.STUDENT,
        profilePic: "",
        bio: "",
        university: "",
        skills: [],
    });
    return await newUser.save();
};
exports.saveUser = saveUser;
const getUserById = async (userId) => {
    const user = await User_1.UserModel.findById(userId).select("-password");
    return user;
};
exports.getUserById = getUserById;
const updateUserById = async (userId, data) => {
    const updatedUser = await User_1.UserModel.findByIdAndUpdate(userId, {
        username: data.username,
        contactNumber: data.contactNumber,
        university: data.university,
        bio: data.bio,
        profilePic: data.profilePic,
    }, { new: true }).select("-password");
    return updatedUser;
};
exports.updateUserById = updateUserById;
const searchUsers = async (username) => {
    return await User_1.UserModel.find({
        username: {
            $regex: username,
            $options: "i",
        },
    }).select("_id username profilePic university");
};
exports.searchUsers = searchUsers;
const getAllUsersService = async () => {
    return await User_1.UserModel.find({
        role: User_1.UserRole.STUDENT
    }, {
        password: 0
    });
};
exports.getAllUsersService = getAllUsersService;
