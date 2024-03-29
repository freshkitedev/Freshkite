import express from "express";
import {
  addStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getStudents,
  //Dashget,
  forgot,
  StudentRegister,
  studentLogin,
  EachStudent,
  OtpVerification,
  ChangePassword
} from "../controllers/student.js";


import { verifyAdmin, verifyStudent } from "../utils/verifyToken.js";

const router = express.Router();

// ADD NEW STUDENT
router.post("/add", addStudent);

// UPDATE STUDENT
router.put("/:id", updateStudent);

// DELETE STUDENT
router.delete("/:id", deleteStudent);

// GET STUDENT
router.get("/:id", getStudent);

// GET ALL STUDENTS
router.get("/", getStudents);

// GET STUDENT COUNT
//router.get('/courses/count', Dashget);


// Route to get student dashboard data
router.post("/login", studentLogin);

//Student Register
router.post("/register", StudentRegister)


//for each coursse how many students took
router.get("/course/count", EachStudent)

router.post("/forgot", forgot)

router.post("/otpverification", OtpVerification)


router.post("/newpasscode", ChangePassword)

export default router;
