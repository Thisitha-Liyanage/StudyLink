"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const User_1 = require("../Models/User");
const adminOnly = async (req, res, next) => {
    const user = await User_1.UserModel.findById(req.user.id);
    console.log("Token User ID:", req.user.id);
    console.log("DB User:", user);
    if (!user || user.role !== User_1.UserRole.ADMIN) {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    next();
};
exports.adminOnly = adminOnly;
