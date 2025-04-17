import express from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate, isOwnerOrAdmin } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route GET /api/users/:id
 * @desc Get user profile by ID
 * @access Public
 */
router.get('/:id', userController.getUserProfile);

/**
 * @route PUT /api/users/:id
 * @desc Update user profile
 * @access Private (owner or admin)
 */
router.put('/:id', authenticate, isOwnerOrAdmin, userController.updateUserProfile);

/**
 * @route POST /api/users/:id/certifications
 * @desc Add a certification to user profile
 * @access Private (owner or admin)
 */
router.post('/:id/certifications', authenticate, isOwnerOrAdmin, userController.addCertification);

/**
 * @route PUT /api/users/:id/password
 * @desc Change user password
 * @access Private (owner or admin)
 */
router.put('/:id/password', authenticate, isOwnerOrAdmin, userController.changePassword);

export default router; 