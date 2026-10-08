import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  favorites,
  addFavorite,
  removeFavorite,
  addRecentlyViewed,
  recentlyViewed,
} from '../controllers/userController.js';

const r = Router();

r.get('/favorites', protect, favorites);
r.post('/favorites/:toolId', protect, addFavorite);
r.delete('/favorites/:toolId', protect, removeFavorite);
r.get('/recently-viewed', protect, recentlyViewed);
r.post(
  '/recently-viewed/:toolId',
  protect,
  addRecentlyViewed
);

export default r;