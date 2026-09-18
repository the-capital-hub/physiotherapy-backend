import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

export function crudRouter(Model, label) {
  const router = Router();
  router.get('/', requireAuth, async (_req, res) => { try { res.json(await Model.find().sort({ createdAt: -1 })); } catch { res.status(500).json({ message: `Failed to fetch ${label}` }); } });
  router.get('/:id', requireAuth, async (req, res) => { try { const item = await Model.findById(req.params.id); if (!item) return res.status(404).json({ message: `${label} not found` }); res.json(item); } catch { res.status(400).json({ message: `Invalid ${label} ID` }); } });
  router.post('/', requireAuth, async (req, res) => { try { res.status(201).json(await Model.create(req.body)); } catch (error) { res.status(400).json({ message: error.message || `Invalid ${label} data` }); } });
  router.put('/:id', requireAuth, async (req, res) => { try { const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: `${label} not found` }); res.json(item); } catch (error) { res.status(400).json({ message: error.message || `Unable to update ${label}` }); } });
  router.delete('/:id', requireAuth, async (req, res) => { try { const item = await Model.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: `${label} not found` }); res.json({ message: `${label} deleted` }); } catch { res.status(400).json({ message: `Invalid ${label} ID` }); } });
  return router;
}
