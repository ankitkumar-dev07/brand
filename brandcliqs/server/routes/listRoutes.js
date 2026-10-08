import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  lists,
  getList,
  createList,
  updateList,
  deleteList,
  addToList,
  removeFromList,
} from '../controllers/listController.js';

const r = Router();

r.use(protect);

r.get('/', lists);
r.post('/', createList);
r.get('/:id', getList);
r.put('/:id', updateList);
r.delete('/:id', deleteList);
r.post('/:id/tools/:toolId', addToList);
r.delete('/:id/tools/:toolId', removeFromList);

export default r;