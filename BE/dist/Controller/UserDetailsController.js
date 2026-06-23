"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = exports.getMyProfile = void 0;
const UserService_1 = require("../Service/UserService");
const User_1 = require("../Models/User");
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ FIXED
        console.log("User ID from token:", userId);
        const user = await User_1.UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getMyProfile = getMyProfile;
const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ FIXED
        const updatedUser = await (0, UserService_1.updateUserById)(userId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Update failed" });
    }
};
exports.updateMyProfile = updateMyProfile;
