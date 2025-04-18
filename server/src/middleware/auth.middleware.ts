import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret');
    
    // Add user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token. Authentication failed.' });
  }
};

// Check if user has admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
};

// Check if user is the owner or an admin
export const isOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.user && 
    (req.user.role === 'admin' || req.user.id === parseInt(req.params.id))
  ) {
    return next();
  }
  
  return res.status(403).json({ message: 'Access denied. Not authorized to access this resource.' });
}; 