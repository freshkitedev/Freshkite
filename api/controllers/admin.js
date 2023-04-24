import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js"; 
import Course from "../models/Course.js";
//added comment for testing purpose
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });
    await newAdmin.save();
    res.status(200).send("Admin has been created.");
 } catch (err) {
    next(err);
  }
};

export const createstudent = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const course = await Course.findOne({ course: req.body.course})
    if (!course) {
      return next(createError(403, "Course not found"))
    }
    else 
    {
      const newStudent = new Student({
        name: req.body.name,
        course: req.body.course,
        year: req.body.year,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        balance : course.fees
      })
      await newStudent.save();
    } 
    
    res.status(200).send("Student has been created.");
 } catch (err) {
    next(err);
  }
};

export const payFee = async(req,res) => {
     const topay = req.body.topay 
     const student = await Student.findById(req.body._id)
}
export const login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ name: req.body.name });
    if (!admin) return next(createError(404, "Admin not found!"));
  console.log(req.body.password);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = admin._doc;
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
