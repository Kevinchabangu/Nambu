import pino from 'pino';
// TODO: Implement or import the 'env' object with required properties (LOG_LEVEL, NODE_ENV)
const env = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    NODE_ENV: process.env.NODE_ENV || 'development'
};
export const logger = pino({
  level: env.LOG_LEVEL,
  base: undefined,
  transport:
    env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
      : undefined
});
export default logger;