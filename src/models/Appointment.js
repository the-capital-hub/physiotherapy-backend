import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  service: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  time: { type: String, required: true, trim: true },
  concern: { type: String, trim: true },
  status: { type: String, enum: ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'], default: 'New' }
}, { timestamps: true });
export default mongoose.model('Appointment', schema);
