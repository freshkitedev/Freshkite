import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import studentsRoute from "./routes/students.js";
import coursesRoute from "./routes/courses.js";
import feeRoute from "./routes/fee.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
app.use(cookieParser())
app.use(express.json());
app.use("/api/students", studentsRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/auth", authRoute);
app.use("/api/fees", feeRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(9020, () => {
    connect();
    console.log("Connected to backend.");
  });