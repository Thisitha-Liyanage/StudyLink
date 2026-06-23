"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.getAllUsers = void 0;
const UserService_1 = require("../Service/UserService");
const AdminService_1 = require("../Service/AdminService");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, UserService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to get users",
        });
    }
};
exports.getAllUsers = getAllUsers;
const getDashboardStats = async (req, res) => {
    try {
        const stats = await (0, AdminService_1.getDashboardStatsService)();
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to load dashboard stats",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
