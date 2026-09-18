import { Router } from 'express';
import Appointment from '../models/Appointment.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.post('/', async (req, res) => { try { const item = await Appointment.create(req.body); return res.status(201).json(item); } catch { return res.status(400).json({ message: 'Invalid appointment data' }); } });
router.get('/', requireAuth, async (req, res) => { try { return res.json(await Appointment.find().sort({ createdAt: -1 })); } catch { return res.status(500).json({ message: 'Failed to fetch appointments' }); } });
router.patch('/:id/status', requireAuth, async (req, res) => { try { const item = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: 'Appointment not found' }); return res.json(item); } catch { return res.status(400).json({ message: 'Invalid appointment ID or status' }); } });
router.delete('/:id', requireAuth, async (req, res) => { try { const item = await Appointment.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Appointment not found' }); return res.json({ message: 'Appointment deleted' }); } catch { return res.status(400).json({ message: 'Invalid appointment ID' }); } });
export default router;
