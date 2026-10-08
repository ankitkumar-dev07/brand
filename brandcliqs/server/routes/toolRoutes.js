import { Router } from 'express';
import {
  listTools,
  getTool,
} from '../controllers/toolController.js';

const r = Router();

r.get('/', listTools);
r.get('/:slug', getTool);

export default r;