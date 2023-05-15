import express from "express";
import { login, register, createstudent, Excel } from "../controllers/admin.js";
import { ChangePassword, OtpVerification, forgot } from "../controllers/admin.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createstudent", createstudent);
router.post("/upload", upload.single("file"), Excel);
router.post("/forgot", forgot)

router.post("/otpverification", OtpVerification)


router.post("/newpasscode", ChangePassword)

export default router;
