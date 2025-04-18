import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Import database connection
import './config/database';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import materialRoutes from './routes/material.routes';
import listingRoutes from './routes/listing.routes';
import transactionRoutes from './routes/transaction.routes';
import transportRoutes from './routes/transport.routes';
import supplyChainRoutes from './routes/supplyChain.routes';
import reportRoutes from './routes/report.routes';
import messageRoutes from './routes/message.routes';

// Create Express app
const app: Express = express();
const PORT = process.env.PORT || 8080;

// Apply middlewares
// Enable CORS
app.use(cors());

// Enhance security with Helmet
app.use(helmet());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(morgan('dev'));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/supply-chains', supplyChainRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 