import express, { Request, Response } from 'express';

const router = express.Router();

// GET all messages
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all messages - Endpoint to be implemented' });
});

// GET message by ID
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Get message ${req.params.id} - Endpoint to be implemented` });
});

// POST new message
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Send message - Endpoint to be implemented' });
});

// GET conversation
router.get('/conversation/:userId', (req: Request, res: Response) => {
  res.status(200).json({ message: `Get conversation with user ${req.params.userId} - Endpoint to be implemented` });
});

export default router;