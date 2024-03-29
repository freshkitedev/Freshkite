import Course from "../models/Course.js";
import Fees from "../models/Fees.js";
import { createError } from "../utils/error.js";
export const createCourse = async (req,res,next)=>{
  
  
  try {
    
    const course = await Fees.findOne({ CourseName: req.body.course})
    if (!course) return next(createError(402, "Fee not defined for the Course"))
    else {
    
    const newCourse = new Course({
      course:req.body.course,
      duration:req.body.duration,
      description:req.body.description,
      fees:course.totalFees
      
    });  
    const savedCourse =  await newCourse.save()
    res.status(200).json(savedCourse);
  
    } 
   

} catch (err) {
  next(err);
}
};

export const updateCourse = async (req,res,next)=>{
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true"}
    )
    res.status(200).json(updatedCourse);
  } catch (err) {
    next(err);
  }
}
export const deleteCourse = async (req,res,next)=>{
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("Course has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getCourse = async (req,res,next)=>{
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
}
export const getCourses = async (req,res,next)=>{
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
}