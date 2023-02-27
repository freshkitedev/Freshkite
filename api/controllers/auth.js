import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Fees from "../models/Fees.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    //const CourseId = req.params.CourseId;
    const newStudent = new Student({
      name: req.body.name,
      course: req.body.course,
      year: req.body.year,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    })
    const savedStudent = await newStudent.save();
    const course = await Course.findOne({ course: req.body.course})
    if (!course) return next(createError(403, "Course not found"))
    else {
      await Course.findOneAndUpdate(course, {
        $push: { studentIds: savedStudent._id },
      });
    } 
    const fees = await Fees.findOne({ year: req.body.year})
    if (!fees) return next(createError(402, "No fee defined for course"))
    else {
      await Fees.findOneAndUpdate(fees, {
        $push: { StudentIds: savedStudent._id },
      });
    }
    await newStudent.save();
    res.status(200).send("Student has been created.");
 } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return next(createError(404, "Student not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: student._id, isAdmin: student.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = student._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
