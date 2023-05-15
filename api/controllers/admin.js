import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import xlsx from "xlsx";
import nodemailer from "nodemailer"

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
    const course = await Course.findOne({ course: req.body.course });
    if (!course) {
      return next(createError(403, "Course not found"));
    } else {
      const newStudent = new Student({
        name: req.body.name,
        course: req.body.course,
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

export const payFee = async (req, res) => {
  const topay = req.body.topay;
  const student = await Student.findById(req.body._id);
};
export const login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ name: req.body.name });
    if (!admin) return next(createError(404, "Admin not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
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

export const Excel = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save each row in the sheet to the database
    for (const row of sheetData) {
      const student = new Student(row);
      await student.save();
    }

    res.json({ message: "Data uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const forgot = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await Admin.findOne({ email });
   

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
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
    const user = await Admin.findOne({ email });

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
    const user = await Admin.findOne({ email });

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