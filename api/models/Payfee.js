import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

var PayFeeSchema = new mongoose.Schema(
    {
      studentId: {
          type: Number,
          required: true,
      },
      feeId: {
        type: Number,
        required: true,
      },
      TotalFees: {
        type: Number,
        required: true,
      },
      AmountToPay: {
        type: Number,
        required: true
      },
      Balance: {
        type: Number,
        required: true,
      },
    }
  )
// autoIncrement.initialize(mongoose.connection);
// PayFeeSchema.plugin(autoIncrement.plugin, {
//   model: "payingFee", 
//   field: "_id", 
//   startAt: 1001, 
//   incrementBy: 1, 
// });
  export default mongoose.model("payingFee", PayFeeSchema);