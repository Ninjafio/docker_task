import { Router } from 'express';
import itemController from '../controllers/item.controller.js';

const router = Router();

router.get('/items', (req, res) => itemController.getItems(req, res));
router.post('/items', (req, res) => itemController.createItem(req, res));
router.delete('/items/:id', (req, res) => itemController.deleteItem(req, res));

export default router;
