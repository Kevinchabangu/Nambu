import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';

import { env } from './lib/env.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/error.js';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { requireAuth, optionalAuth } from './middleware/auth.js';

export function buildApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet());

  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
      credentials: true,
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));

  app.use(
    pinoHttp({
      customSuccessMessage: (req: express.Request, res: express.Response) => `${req.method} ${req.url} -> ${res.statusCode}`,
      customErrorMessage: (req: express.Request, res: express.Response, err: unknown) =>
        `ERROR ${req.method} ${req.url} -> ${res.statusCode} ${(err as Error)?.message ?? ''}`,
    })
  );

  app.get('/', (_req, res) => res.send('Server is running with TypeScript!'));
  app.use('/health', healthRouter);
  app.use('/auth', authRouter);

  // example protected route so requireAuth isn’t unused
  app.get('/me', requireAuth, (req, res) => {
    res.json({ user: req.user ?? null });
  });

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
