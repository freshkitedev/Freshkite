import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      defualt: false,
    },
  },
    { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
StudentSchema.plugin(autoIncrement.plugin, {
  model: "Student", 
  field: "_id", 
  startAt: 101, 
  incrementBy: 1, 
});

  export default mongoose.model("Student", StudentSchema);