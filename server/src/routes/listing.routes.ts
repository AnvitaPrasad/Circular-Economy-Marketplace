import express, { Request, Response } from 'express';

const router = express.Router();

// GET all listings
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all listings - Endpoint to be implemented' });
});

// GET listing by ID
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Get listing ${req.params.id} - Endpoint to be implemented` });
});

// POST new listing
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create listing - Endpoint to be implemented' });
});

// PUT update listing
router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Update listing ${req.params.id} - Endpoint to be implemented` });
});

// DELETE listing
router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete listing ${req.params.id} - Endpoint to be implemented` });
});

export default router;