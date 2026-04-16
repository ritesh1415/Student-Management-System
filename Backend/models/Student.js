import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  admissionNo: { type: String, unique: true },

  name: String,
  course: String,
  year: Number,

  dob: Date,          
  gender: String,    

  email: String,
  mobile: String,
  address: String,

  photo: String
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);