import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  icon: { type: String, trim: true },
  duration: { type: String, trim: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Service', schema);
