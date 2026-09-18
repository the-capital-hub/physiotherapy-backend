import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('FAQ', schema);
