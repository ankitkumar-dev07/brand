import { Router } from 'express';
import {
  subscribe,
  support,
  upgrade,
  subscription,
  cancel,
} from '../controllers/miscController.js';
import { protect } from '../middleware/auth.js';

const r = Router();

r.post('/newsletter/subscribe', subscribe);
r.post('/support/contact', support);
r.post(
  '/subscriptions/upgrade',
  protect,
  upgrade
);
r.get(
  '/subscriptions',
  protect,
  subscription
);
r.post(
  '/subscriptions/cancel',
  protect,
  cancel
);

export default r;