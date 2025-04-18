import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for authenticated users
 * @param payload - User data to encode in the token
 * @returns JWT token
 */
export const generateToken = (payload: any): string => {
  // @ts-ignore - Bypassing TypeScript issues with JWT secrets
  const secret = process.env.JWT_SECRET || 'default_jwt_secret';
  const expiry = process.env.JWT_EXPIRES_IN || '7d';
  
  try {
    // @ts-ignore - Bypassing TypeScript issues with JWT sign
    return jwt.sign(payload, secret, { expiresIn: expiry });
  } catch (error) {
    console.error('JWT Sign Error:', error);
    return '';
  }
};

/**
 * Verify a JWT token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
export const verifyToken = (token: string): any | null => {
  try {
    // @ts-ignore - Bypassing TypeScript issues with JWT verify
    const secret = process.env.JWT_SECRET || 'default_jwt_secret';
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

 