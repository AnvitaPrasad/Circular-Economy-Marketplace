import { Request, Response } from 'express';
import pool from '../config/database';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';
import { UserLoginInput, UserRegistrationInput, UserRole, CompanyType } from '../interfaces/user.interface';
import Joi from 'joi';

// Validation schema for user registration
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  company_name: Joi.string().required(),
  role: Joi.string().valid('company', 'transporter', 'admin').required(),
  contact_person: Joi.string().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  company_type: Joi.string().valid('manufacturer', 'recycler', 'processor', 'distributor').when('role', {
    is: 'company',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  industry_sector: Joi.string().optional()
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
  try {
    const userData: UserRegistrationInput = req.body;
    
    // Validate request body
    const { error } = registrationSchema.validate(userData);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details
      });
    }

    // Check if email already exists
    const emailExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [userData.email]
    );

    if (emailExists.rows.length > 0) {
      return res.status(400).json({
        message: 'Email already in use'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Start a transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert user
      const userResult = await client.query(
        `INSERT INTO users (
          email, password_hash, role, company_name, contact_person, 
          phone, address, city, state, country, postal_code
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING user_id, email, role, company_name, contact_person, verified`,
        [
          userData.email,
          hashedPassword,
          userData.role,
          userData.company_name,
          userData.contact_person || null,
          userData.phone || null,
          userData.address || null,
          userData.city || null,
          userData.state || null,
          userData.country || null,
          userData.postal_code || null
        ]
      );

      const newUser = userResult.rows[0];

      // If role is company, create company profile
      if (userData.role === 'company' && userData.company_type) {
        await client.query(
          `INSERT INTO company_profiles (
            user_id, company_type, industry_sector
          ) VALUES ($1, $2, $3)`,
          [
            newUser.user_id,
            userData.company_type as CompanyType,
            userData.industry_sector || null
          ]
        );
      }
      
      // If role is transporter, create transport provider profile
      if (userData.role === 'transporter') {
        await client.query(
          `INSERT INTO transportation_providers (
            user_id, transport_types, eco_friendly_options, has_hazmat_certification
          ) VALUES ($1, $2, $3, $4)`,
          [
            newUser.user_id,
            ['road'], // Default transport type
            false,
            false
          ]
        );
      }
      
      await client.query('COMMIT');
      
      // Generate token
      const token = generateToken({
        id: newUser.user_id,
        email: newUser.email,
        role: newUser.role
      });
      
      // Return user data and token
      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          ...newUser,
          token
        }
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

/**
 * Login user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const loginData: UserLoginInput = req.body;
    
    // Validate request body
    const { error } = loginSchema.validate(loginData);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details
      });
    }

    // Find user by email
    const result = await pool.query(
      'SELECT user_id, email, password_hash, role, company_name, contact_person, verified, active FROM users WHERE email = $1',
      [loginData.email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.active) {
      return res.status(403).json({
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Compare passwords
    const passwordMatch = await comparePassword(loginData.password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken({
      id: user.user_id,
      email: user.email,
      role: user.role
    });

    // Remove password from response
    delete user.password_hash;

    // Return user data and token
    return res.status(200).json({
      message: 'Login successful',
      user: {
        ...user,
        token
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}; 