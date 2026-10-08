import { Router } from 'express';
import {
  protect,
  adminOnly,
} from '../middleware/auth.js';
import {
  stats,
  createTool,
  updateTool,
  deleteTool,
  users,
  subscribers,
  messages,
  subscriptions,
} from '../controllers/adminController.js';

const r = Router();

r.use(protect, adminOnly);

r.get('/stats', stats);
r.get('/users', users);
r.get('/subscribers', subscribers);
r.get('/messages', messages);
r.get('/subscriptions', subscriptions);

r.post('/tools', createTool);
r.put('/tools/:id', updateTool);
r.delete('/tools/:id', deleteTool);

export default r;