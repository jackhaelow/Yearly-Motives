import express from "express";
import * as UserControler from "../controllers/users";
import { requiresAuth } from "../Middleware/auth";

const router = express.Router();

router.get("/",requiresAuth,UserControler.getAuthentcatedUser);
router.post("/signup",UserControler.signUp);
router.post("/login",UserControler.login);
router.post("/logout",UserControler.logout);

export default router;