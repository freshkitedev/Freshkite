import Fees from "../models/Fees.js";
import Student from "../models/Student.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import Course from "../models/Course.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true" }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
};
export const deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const fees1 = await Fees.findOne(
      { StudentsIds: req.params.id },
      { _id: 1, totalFees: 1 }
    );
    //res.status(200).json(student);
    res.status(200).json({
      status: "success",
      details: student,
      fees: fees1,
    });
  } catch (err) {
    next(err);
  }
};
export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

//admin dashboard student's count
export const Dashget = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.send({ count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const addStudent = async (req, res, next) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
};

export const studentLogin = async (req, res, next) => {
  try {
    const student = await Student.findOne({ name: req.body.name });
    if (!student) {
      return next(createError(400, "Invalid email or password"));
    }
    const isMatch = await bcrypt.compare(req.body.password, student.password);
    if (!isMatch) {
      return next(createError(400, "Invalid email or password"));
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};


export const StudentRegister = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const course = await Course.findOne({ course: req.body.selectedCourse });
    if (!course) {
      return next(createError(403, "Course not found"));
    } else {
      const newStudent = new Student({
        name: req.body.name,
        course: req.body.selectedCourse,
        year: req.body.year,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        balance: course.fees,
      });
      await newStudent.save();
    }

    res.status(200).send("Student has been created.");
  } catch (err) {
    next(err);
  }
};
