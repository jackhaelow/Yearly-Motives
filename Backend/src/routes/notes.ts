import express from "express";
import * as NoteController from "../controllers/notescontroller";

const router = express.Router();

router.get("/", NoteController.getNotes);
router.get("/:noteId",NoteController.getNote);
 
router.post("/",NoteController.createNote);
router.patch("/:noteId",NoteController.UpdateNote);
router.delete("/:noteId",NoteController.deletNote);



export default router;