import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

var AdminSchema = new mongoose.Schema(
    {
      name: {
          type: String,
          required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: true,
      },

      otp: {
        type: String, // or Number, depending on your preference
      },
      otpExpiration: {
        type: Date,
      },
    }
  )
autoIncrement.initialize(mongoose.connection);
AdminSchema.plugin(autoIncrement.plugin, {
  model: "Admin", 
  field: "_id", 
  startAt: 3001, 
  incrementBy: 1, 
});
  export default mongoose.model("Admin", AdminSchema);