import { Router } from 'express';
import Category from '../models/Category.js';

const r = Router();

r.get('/', async (req, res, next) => {
  try {
    res.json({
      categories: await Category.find().sort({
        name: 1,
      }),
    });
  } catch (e) {
    next(e);
  }
});

export default r;