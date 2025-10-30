import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address!`
    }
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        // Accepts only 10 digits
        return /^\d{10}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`
    }
  },
  department: String,
  subjects: [String], // subject codes
  maxHoursPerDay: { type: Number, default: 4 },
  preferredSlots: [String]
});

export default mongoose.model("Faculty", FacultySchema);
