import Fees from "../models/Fees.js";
import Student from "../models/Student.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import Course from "../models/Course.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer"
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
//export const Dashget = async (req, res) => {
//try {
// const count = await Student.countDocuments();
//res.send({ count });
//} catch (error) {
//console.error(error);
//res.status(500).send("Server error");
//}
//};

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
    //const studentId = student._id; // store the student ID in a variable
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

export const EachStudent = async (req, res) => {
  try {
    const students = await Student.aggregate([
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
export const forgot = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await Student.findOne({ email });
    console.log("found")

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)

    const transporter = nodemailer.createTransport({
      host: process.env.host,
      port: process.env.port,
      secure: process.env.SECURE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const emailBody = `Your OTP for resetting your password is: ${otp}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password OTP',
      text: emailBody
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send OTP.' });
      } else {
        console.log('Email sent: ' + info.response);

        // Save the OTP to the user document in the database
        user.otp = otp;
        user.otpExpiration = Date.now() + 600000; // OTP expires in 10 minutes
        user.save();

        return res.status(200).json({ message: 'OTP sent successfully.' });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

export const OtpVerification = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp)

  try {
    // Check if the email exists in the database
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Verify the entered OTP against the stored OTP in the user document
    if (otp !== user.otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Verify if the OTP has expired
    if (user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // OTP verification successful

    // Send email notification or perform any additional actions here

    // Clear the OTP and OTP expiration fields in the user document
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: 'OTP verification successful.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};




export const ChangePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Hash the new password
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
