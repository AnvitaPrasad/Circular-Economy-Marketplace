import express, { Request, Response } from 'express';

const router = express.Router();

// GET all reports
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all reports - Endpoint to be implemented' });
});

// GET report by ID
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Get report ${req.params.id} - Endpoint to be implemented` });
});

// POST new report
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create report - Endpoint to be implemented' });
});

export default router; 