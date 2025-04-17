import { Request, Response } from 'express';
import pool from '../config/database';
import { hashPassword } from '../utils/password.utils';
import Joi from 'joi';

// Get user profile by ID
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user exists
    const userResult = await pool.query(
      `SELECT 
        u.user_id, u.email, u.role, u.company_name, u.contact_person, 
        u.phone, u.address, u.city, u.state, u.country, u.postal_code,
        u.logo_url, u.website, u.company_description, u.registration_number,
        u.verified, u.active, u.created_at
      FROM users u
      WHERE u.user_id = $1 AND u.active = true`,
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    const user = userResult.rows[0];
    
    // Get additional profile data based on role
    if (user.role === 'company') {
      const companyResult = await pool.query(
        `SELECT 
          cp.company_type, cp.founding_year, cp.employee_count, 
          cp.annual_revenue, cp.sustainability_goals, cp.industry_sector, 
          cp.primary_materials
        FROM company_profiles cp
        WHERE cp.user_id = $1`,
        [userId]
      );
      
      if (companyResult.rows.length > 0) {
        user.companyProfile = companyResult.rows[0];
      }
      
      // Get certifications
      const certResult = await pool.query(
        `SELECT 
          certification_id, certification_type, certification_name, 
          issuing_body, issue_date, expiry_date, certificate_url, 
          verified, created_at
        FROM certifications
        WHERE user_id = $1
        ORDER BY issue_date DESC`,
        [userId]
      );
      
      user.certifications = certResult.rows;
      
    } else if (user.role === 'transporter') {
      const transporterResult = await pool.query(
        `SELECT 
          provider_id, transport_types, service_areas, fleet_size,
          eco_friendly_options, has_hazmat_certification, insurance_info
        FROM transportation_providers
        WHERE user_id = $1`,
        [userId]
      );
      
      if (transporterResult.rows.length > 0) {
        user.transporterProfile = transporterResult.rows[0];
      }
    }
    
    return res.status(200).json({
      user
    });
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      message: 'Server error while fetching user profile',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const updateData = req.body;
    
    // Ensure authenticated user can only update their own profile unless admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this profile'
      });
    }
    
    // Validation schema for user update
    const updateSchema = Joi.object({
      company_name: Joi.string().optional(),
      contact_person: Joi.string().optional(),
      phone: Joi.string().optional(),
      address: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      postal_code: Joi.string().optional(),
      logo_url: Joi.string().optional(),
      website: Joi.string().optional(),
      company_description: Joi.string().optional(),
      // Company profile fields
      company_type: Joi.string().valid('manufacturer', 'recycler', 'processor', 'distributor').optional(),
      founding_year: Joi.number().integer().optional(),
      employee_count: Joi.number().integer().optional(),
      annual_revenue: Joi.number().precision(2).optional(),
      sustainability_goals: Joi.string().optional(),
      industry_sector: Joi.string().optional(),
      primary_materials: Joi.array().items(Joi.string()).optional(),
      // Transporter profile fields
      transport_types: Joi.array().items(Joi.string().valid('road', 'rail', 'sea', 'air')).optional(),
      service_areas: Joi.array().items(Joi.string()).optional(),
      fleet_size: Joi.number().integer().optional(),
      eco_friendly_options: Joi.boolean().optional(),
      has_hazmat_certification: Joi.boolean().optional(),
      insurance_info: Joi.string().optional()
    });
    
    // Validate update data
    const { error } = updateSchema.validate(updateData);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details
      });
    }
    
    // Start a transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get current user data
      const userResult = await client.query(
        'SELECT role FROM users WHERE user_id = $1',
        [userId]
      );
      
      if (userResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          message: 'User not found'
        });
      }
      
      const userRole = userResult.rows[0].role;
      
      // Update user basic info
      const userFields = [
        'company_name', 'contact_person', 'phone', 'address', 'city', 
        'state', 'country', 'postal_code', 'logo_url', 'website', 
        'company_description'
      ];
      
      const userUpdateFields = [];
      const userUpdateValues = [];
      let paramCount = 1;
      
      for (const field of userFields) {
        if (updateData[field] !== undefined) {
          userUpdateFields.push(`${field} = $${paramCount}`);
          userUpdateValues.push(updateData[field]);
          paramCount++;
        }
      }
      
      if (userUpdateFields.length > 0) {
        userUpdateValues.push(userId);
        await client.query(
          `UPDATE users 
           SET ${userUpdateFields.join(', ')}, updated_at = NOW() 
           WHERE user_id = $${paramCount}`,
          userUpdateValues
        );
      }
      
      // Update role-specific profile data
      if (userRole === 'company') {
        const companyFields = [
          'company_type', 'founding_year', 'employee_count', 'annual_revenue',
          'sustainability_goals', 'industry_sector', 'primary_materials'
        ];
        
        const companyUpdateFields = [];
        const companyUpdateValues = [];
        paramCount = 1;
        
        for (const field of companyFields) {
          if (updateData[field] !== undefined) {
            companyUpdateFields.push(`${field} = $${paramCount}`);
            companyUpdateValues.push(updateData[field]);
            paramCount++;
          }
        }
        
        if (companyUpdateFields.length > 0) {
          // Check if company profile exists
          const profileExists = await client.query(
            'SELECT profile_id FROM company_profiles WHERE user_id = $1',
            [userId]
          );
          
          companyUpdateValues.push(userId);
          
          if (profileExists.rows.length > 0) {
            // Update existing profile
            await client.query(
              `UPDATE company_profiles 
               SET ${companyUpdateFields.join(', ')}, updated_at = NOW() 
               WHERE user_id = $${paramCount}`,
              companyUpdateValues
            );
          } else {
            // Create new profile
            const fields = companyUpdateFields.map(f => f.split(' = ')[0]);
            const placeholders = Array.from({ length: fields.length }, (_, i) => `$${i + 1}`).join(', ');
            
            await client.query(
              `INSERT INTO company_profiles (${fields.join(', ')}, user_id) 
               VALUES (${placeholders}, $${paramCount})`,
              companyUpdateValues
            );
          }
        }
      } else if (userRole === 'transporter') {
        const transporterFields = [
          'transport_types', 'service_areas', 'fleet_size', 
          'eco_friendly_options', 'has_hazmat_certification', 'insurance_info'
        ];
        
        const transporterUpdateFields = [];
        const transporterUpdateValues = [];
        paramCount = 1;
        
        for (const field of transporterFields) {
          if (updateData[field] !== undefined) {
            transporterUpdateFields.push(`${field} = $${paramCount}`);
            transporterUpdateValues.push(updateData[field]);
            paramCount++;
          }
        }
        
        if (transporterUpdateFields.length > 0) {
          // Check if transporter profile exists
          const providerExists = await client.query(
            'SELECT provider_id FROM transportation_providers WHERE user_id = $1',
            [userId]
          );
          
          transporterUpdateValues.push(userId);
          
          if (providerExists.rows.length > 0) {
            // Update existing profile
            await client.query(
              `UPDATE transportation_providers 
               SET ${transporterUpdateFields.join(', ')}, updated_at = NOW() 
               WHERE user_id = $${paramCount}`,
              transporterUpdateValues
            );
          } else {
            // Create new profile
            const fields = transporterUpdateFields.map(f => f.split(' = ')[0]);
            const placeholders = Array.from({ length: fields.length }, (_, i) => `$${i + 1}`).join(', ');
            
            await client.query(
              `INSERT INTO transportation_providers (${fields.join(', ')}, user_id) 
               VALUES (${placeholders}, $${paramCount})`,
              transporterUpdateValues
            );
          }
        }
      }
      
      await client.query('COMMIT');
      
      return res.status(200).json({
        message: 'Profile updated successfully'
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({
      message: 'Server error while updating user profile',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Add a certification to company profile
export const addCertification = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Ensure authenticated user can only update their own profile unless admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this profile'
      });
    }
    
    // Validation schema for certification
    const certSchema = Joi.object({
      certification_type: Joi.string().valid(
        'iso14001', 'iso9001', 'greenCircle', 
        'cradleToCradle', 'fairTrade', 'other'
      ).required(),
      certification_name: Joi.string().required(),
      issuing_body: Joi.string().required(),
      issue_date: Joi.date().required(),
      expiry_date: Joi.date().greater(Joi.ref('issue_date')).optional(),
      certificate_url: Joi.string().uri().optional()
    });
    
    // Validate certification data
    const { error } = certSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details
      });
    }
    
    // Insert certification
    const result = await pool.query(
      `INSERT INTO certifications (
        user_id, certification_type, certification_name, 
        issuing_body, issue_date, expiry_date, certificate_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        userId,
        req.body.certification_type,
        req.body.certification_name,
        req.body.issuing_body,
        req.body.issue_date,
        req.body.expiry_date || null,
        req.body.certificate_url || null
      ]
    );
    
    return res.status(201).json({
      message: 'Certification added successfully',
      certification: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error adding certification:', error);
    return res.status(500).json({
      message: 'Server error while adding certification',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Change user password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Ensure authenticated user can only update their own password unless admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to change this password'
      });
    }
    
    // Validation schema for password change
    const passwordSchema = Joi.object({
      current_password: Joi.string().required(),
      new_password: Joi.string().min(8).required(),
      confirm_password: Joi.string().valid(Joi.ref('new_password')).required()
        .messages({ 'any.only': 'Passwords do not match' })
    });
    
    // Validate password data
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details
      });
    }
    
    // Get current password hash
    const userResult = await pool.query(
      'SELECT password_hash FROM users WHERE user_id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    // Verify current password
    const isPasswordValid = await comparePassword(
      req.body.current_password,
      userResult.rows[0].password_hash
    );
    
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Current password is incorrect'
      });
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(req.body.new_password);
    
    // Update password
    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE user_id = $2',
      [hashedPassword, userId]
    );
    
    return res.status(200).json({
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({
      message: 'Server error while changing password',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

// Import the comparePassword function
import { comparePassword } from '../utils/password.utils'; 