import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  bio: { type: String, trim: true },
  image: { type: String, trim: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('TeamMember', schema);
