"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsService = void 0;
const User_1 = require("../Models/User");
const Note_1 = __importDefault(require("../Models/Note"));
const getDashboardStatsService = async () => {
    const userCount = await User_1.UserModel.countDocuments({
        role: User_1.UserRole.STUDENT,
    });
    const noteCount = await Note_1.default.countDocuments();
    return {
        userCount,
        noteCount,
    };
};
exports.getDashboardStatsService = getDashboardStatsService;
