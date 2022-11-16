import express from "express";
import {
  updateStudent,
  deleteStudent,
  getStudent,
  getStudents,
} from "../controllers/student.js";
import { verifyAdmin, verifyToken, verifyStudent } from "../utils/verifyToken.js";

const router = express.Router();
//UPDATE
router.put("/:id", verifyStudent, updateStudent);

//DELETE
router.delete("/:id",verifyStudent, deleteStudent);

//GET
router.get("/:id", verifyStudent, getStudent);

//GET ALL
router.get("/", verifyAdmin, getStudents);

export default router;