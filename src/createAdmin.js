import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

try {
  await connectDB();
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');
  if (!email || !password || password.length < 8) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 8 characters) in .env');
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash, active: true },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log('Admin created/updated');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.connection.close().catch(() => {});
}
