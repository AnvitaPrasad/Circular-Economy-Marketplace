import express, { Request, Response } from 'express';

const router = express.Router();

// GET all transactions
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all transactions - Endpoint to be implemented' });
});

// GET transaction by ID
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Get transaction ${req.params.id} - Endpoint to be implemented` });
});

// POST new transaction
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create transaction - Endpoint to be implemented' });
});

// PUT update transaction
router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Update transaction ${req.params.id} - Endpoint to be implemented` });
});

export default router;