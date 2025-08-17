import { buildApp } from './app.js';
import { env } from './lib/env.js';
import { logger } from './middleware/logger.js';

const app = buildApp();

app.listen(env.PORT, () => {
  logger.info(`HTTP server listening on http://localhost:${env.PORT}`);
});
// Uncomment the following line to enable CORS in development
// app.use(cors({ origin: env.CORS_ORIGIN }));