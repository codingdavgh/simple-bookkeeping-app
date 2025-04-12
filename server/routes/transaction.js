import express from 'express';
import {
  createTransaction,
  getTransactions,
  deleteTransaction
} from '../controllers/transactionController.js';

import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

export default router;
