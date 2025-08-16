import { Router } from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../../package.json');

export const healthRouter = Router();
healthRouter.get('/', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
healthRouter.get('/version', (_req, res) => res.json({ name: pkg.name, version: pkg.version }));
