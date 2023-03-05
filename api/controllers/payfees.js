import Student from "../models/Student.js";
import { createError } from "../utils/error.js";
export const payFees = async(req,res)=>
{

  try{ 
    console.log(req.body.amntopay);
    const student = await Student.findById(req.body._id)
    const remaining = student.balance - req.body.amntopay
    await Student.findByIdAndUpdate(req.body._id,{balance:remaining})
    res.status(200).json("Payment Successfull")
  }
  catch(err){ 
    console.log(err);
  }
}

 