import express from "express";
import {
  updateStudent,
  deleteStudent,
  getStudent,
  getStudents,
} from "../controllers/student.js";

import { verifyAdmin, verifyToken, verifyStudent } from "../utils/verifyToken.js";

const router = express.Router();
//UPDATE  STUDENT
router.put("/:id", verifyStudent, updateStudent);

//DELETE STUDENT
router.delete("/:id", verifyAdmin, deleteStudent);

//GET STUDENT
router.get("/:id", verifyAdmin, getStudent);

//GET ALL STUDENT
router.get("/", verifyAdmin, getStudents);

export default router;
