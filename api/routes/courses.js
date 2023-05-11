import express from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getCourses,
} from "../controllers/course.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE/
router.post("/",  createCourse);
//UPDATE
router.put("/:id",  updateCourse);

//DELETE
router.delete("/:id",  deleteCourse);

//GET
router.get("/:id",  getCourse);

router.get("/",  getCourses);
//GET ALL

export default router;