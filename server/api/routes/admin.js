import express from "express";
import { login, register,createstudent } from "../controllers/admin.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/createstudent",createstudent)

export default router