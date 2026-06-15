import express from "express";
import { authenticate } from "../Middleware/auth";
import {
    addNote,
    editNote,
    getMyNotes,
    getSingleNote,
    removeNote,
} from "../Controller/NoteController";



const router = express.Router();
router.get("/", authenticate, getMyNotes);
router.get("/my", authenticate, getMyNotes);
router.get("/:id", authenticate, getSingleNote);
router.put("/:id", authenticate, editNote);
router.post("/", authenticate, addNote);
router.delete("/:id", authenticate, removeNote);


export default router;