"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../Middleware/auth");
const NoteController_1 = require("../Controller/NoteController");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, NoteController_1.getMyNotes);
router.get("/my", auth_1.authenticate, NoteController_1.getMyNotes);
router.get("/:id", auth_1.authenticate, NoteController_1.getSingleNote);
router.put("/:id", auth_1.authenticate, NoteController_1.editNote);
router.post("/", auth_1.authenticate, NoteController_1.addNote);
router.delete("/:id", auth_1.authenticate, NoteController_1.removeNote);
exports.default = router;
