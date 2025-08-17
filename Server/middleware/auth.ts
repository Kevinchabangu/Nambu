import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-default-secret'
};

export interface JwtUser {
  id: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'EDITOR' | 'VIEWER';
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUser;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : '';
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing token' } });

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtUser;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
  }
}
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : '';
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtUser;
    req.user = decoded;
  } catch {
    // Ignore invalid token
  } finally {
    next();
  }
}