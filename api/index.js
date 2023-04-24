import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import studentsRoute from "./routes/students.js";
import coursesRoute from "./routes/courses.js";
import feeRoute from "./routes/fee.js";
import payRoute from "./routes/payfees.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
dotenv.config(); 

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB."); 
    console.log("cloud mongodb connected ");
    console.log("connected");
	  console.log("added test line");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!"); 
  console.log("cloud mongodb disconnected try again");
});
app.use(cookieParser())
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use("/api/admin", adminRoute);
app.use("/api/students", studentsRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/auth", authRoute); 
app.use("/api/fees", feeRoute);
app.use("/api/pay", payRoute);

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
