// src/routes/auth.ts
import { Router } from 'express';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

export const authRouter = Router();

// simple public endpoint
authRouter.get('/', (_req, res) => {
  res.send('Auth route');
});

// example protected endpoint
authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user ?? null });
});
