import { Router } from 'express';
import Setting from '../models/Setting.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/', requireAuth, async (_req, res) => { try { res.json(await Setting.find().sort({ key: 1 })); } catch { res.status(500).json({ message: 'Failed to fetch settings' }); } });
router.put('/:key', requireAuth, async (req, res) => { try { res.json(await Setting.findOneAndUpdate({ key: req.params.key }, { key: req.params.key, value: req.body.value }, { upsert: true, new: true, runValidators: true })); } catch { res.status(400).json({ message: 'Unable to save setting' }); } });
export default router;
