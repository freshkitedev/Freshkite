import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
var FeesSchema = new mongoose.Schema(
    {
      totalFees: {
        type: Number,
        required: true, 
      },
      year: {
        type: Number,
        required: true, 
      },
      CourseName: {
        type: String,
        required: true,
        unique:true
      }
      
    }
  )
  autoIncrement.initialize(mongoose.connection);
  FeesSchema.plugin(autoIncrement.plugin, {
    model: "Fees", 
    field: "_id", 
    startAt: 2001, 
    incrementBy: 1, 
  });
  
  export default mongoose.model("Fees", FeesSchema);