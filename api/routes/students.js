import express from "express";
import {
  updateStudent,
  deleteStudent,
  getStudent,
  getStudents,
} from "../controllers/student.js";

import { verifyAdmin, verifyStudent } from "../utils/verifyToken.js";

const router = express.Router();
//UPDATE  STUDENT
router.put("/:id",  updateStudent);

//DELETE STUDENT
router.delete("/:id", deleteStudent);

//GET STUDENT
router.get("/:id", getStudent);

//GET ALL STUDENT
router.get("/", getStudents);

export default router;
