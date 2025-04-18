import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserLoginInput, UserRegistrationInput, UserRole, CompanyType } from '../interfaces/user.interface';
import Joi from 'joi';
import pool from '../config/database';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';

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
    console.log('Registration request received:', req.body);
    
    // Skip validation for now to simplify debugging
    
    // For now use mock data
    const userData = {
      id: 'user-' + Math.floor(Math.random() * 10000),
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      companyName: req.body.companyName
    };
    
    // Generate token
    const token = generateToken({
      id: userData.id,
      email: userData.email,
      role: userData.role
    });
    
    // Return success response with token
    console.log('Registration successful:', userData);
    console.log('Generated token:', token);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userData,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

/**
 * Login user and return JWT token
 */
export const login = async (req: Request, res: Response) => {
  try {
    // Placeholder for login logic
    const { email, password } = req.body;
    
    // Mock successful login using the generateToken utility
    const token = generateToken({ id: 'mock-id', email });
    
    res.status(200).json({
      success: true,
      token,
      user: { id: 'mock-id', email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
}; 