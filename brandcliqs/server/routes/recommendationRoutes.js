import { Router } from 'express';
import { recommend } from '../controllers/recommendationController.js';

const r = Router();

r.post('/', recommend);

export default r;