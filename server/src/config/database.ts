import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database connection configuration
let pool: Pool;

// Check if DATABASE_URL exists (Railway provides this)
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  // Fallback to individual connection parameters
  pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'circular_economy_marketplace',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
  });
}

// Test the connection
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Error connecting to the database:', err);
  process.exit(1);
});

export default pool; 