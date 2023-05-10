import Fees from "../models/Fees.js";
import Student from "../models/Student.js";
import payfingfee from "../models/Payfee.js";

export const updateStudent = async (req,res,next)=>{
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true"}
      
    )
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
}
export const deleteStudent = async (req,res,next)=>{
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getStudent = async (req,res,next)=>{
  try {
   const student = await Student.findById(req.params.id);
   const fees1 = await Fees.findOne({StudentsIds: req.params.id}, {_id: 1, totalFees: 1});
    //res.status(200).json(student);
  res.status(200).json({
    status: 'success',
    details: student, 
    fees: fees1 
});
  } catch (err) {
    next(err);
  }
}
export const getStudents = async (req,res,next)=>{
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
}






export const Dashget = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    console.log({count})
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


export const StudentDashboard = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    // Find student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find courses for the student
    const courses = await Course.find({ students: studentId });

    // Find payments for the student
    const payments = await payfingfee.find({ student: studentId });

    res.json({ student, courses, payments });
  } catch (error) {
    next(error);
  }
}
