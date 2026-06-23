"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controller/AuthController");
const UserDetailsController_1 = require("../Controller/UserDetailsController");
const auth_1 = require("../Middleware/auth");
const DashBoardController_1 = require("../Controller/DashBoardController");
const router = express_1.default.Router();
router.post("/register", AuthController_1.registerUser);
router.post("/login", AuthController_1.loginUser);
router.get("/me", auth_1.authenticate, UserDetailsController_1.getMyProfile);
router.put("/me", auth_1.authenticate, UserDetailsController_1.updateMyProfile);
router.get("/search", auth_1.authenticate, DashBoardController_1.searchUsersService);
exports.default = router;
