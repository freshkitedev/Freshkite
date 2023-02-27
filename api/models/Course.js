import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
var CourseSchema = new mongoose.Schema(
    {
      course: {
          type: String,
          required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      studentIds: {
        type: [String],
      },
    }
  )
autoIncrement.initialize(mongoose.connection);
CourseSchema.plugin(autoIncrement.plugin, {
  model: "Course", 
  field: "_id", 
  startAt: 1, 
  incrementBy: 1, 
});
  export default mongoose.model("Course", CourseSchema);