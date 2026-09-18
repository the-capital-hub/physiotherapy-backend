import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
const router = Router();
router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const admin = await Admin.findOne({ email, active: true }).select('+passwordHash');
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) return res.status(401).json({ message: 'Invalid credentials' });
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) return res.status(500).json({ message: 'Server authentication is not configured securely' });
    const token = jwt.sign({ id: admin._id.toString(), email: admin.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token, admin: { email: admin.email } });
  } catch (error) { return res.status(500).json({ message: 'Login failed' }); }
});
export default router;
