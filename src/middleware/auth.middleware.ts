import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { userid: string; email: string; is_admin: boolean };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {

  console.log("auth middleware works")
  console.log('Request Headers:', req.headers); 
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); 
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted Token:', token); 

  if (!token) {
    console.log('No token provided');
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRE || 'AiBV54oimJOtm1HV'
    console.log('JWT_SECRET:', secret); 
    const decoded = jwt.verify(token, secret) as { userid: string; email: string; is_admin: boolean };
    console.log('Decoded Token:', decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error); 
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};