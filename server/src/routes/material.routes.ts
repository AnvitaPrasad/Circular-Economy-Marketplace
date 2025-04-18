import express, { Request, Response } from 'express';

const router = express.Router();

// GET all materials
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all materials - Endpoint to be implemented' });
});

// GET material by ID
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Get material ${req.params.id} - Endpoint to be implemented` });
});

// POST new material
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create material - Endpoint to be implemented' });
});

// PUT update material
router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Update material ${req.params.id} - Endpoint to be implemented` });
});

// DELETE material
router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete material ${req.params.id} - Endpoint to be implemented` });
});

export default router; 