import Fee from "../models/Payfee.js";
//import Student from "../models/Student.js";
import Fees from "../models/Fees.js"
export const payFees = async (req,res,next)=>{
  const feeid = await Fees.findOne({ StudentIds: req.params.id})
    try {
      const PayFees = new Fee ({
        studentId: req.params.id,
        feeId : feeid._id,
        TotalFees: feeid.totalFees,
        AmountToPay: req.body.AmountToPay,
        Balance: feeid.totalFees - req.body.AmountToPay
      });
      //var modified = await Fee.findOne({studentId: req.params.id});
      //var modifiedFee = modified.Balance;
      const payFee = await PayFees.save()
      res.status(200).json(payFee);
    } catch (err) {
      next(err);
    }
  }

  export const updatepayFees = async (req,res,next)=>{
    try {
      const updatedpayFees = await Fee.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
      res.status(200).json(updatedpayFees);
    } catch (err) {
      next(err);
    }
  }

