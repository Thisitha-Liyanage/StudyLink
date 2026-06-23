"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../Controller/AdminController");
const auth_1 = require("../Middleware/auth");
const adminAuth_1 = require("../Middleware/adminAuth");
const router = express_1.default.Router();
router.get("/all", auth_1.authenticate, adminAuth_1.adminOnly, AdminController_1.getAllUsers);
router.get("/dashboard", auth_1.authenticate, adminAuth_1.adminOnly, AdminController_1.getDashboardStats);
exports.default = router;
