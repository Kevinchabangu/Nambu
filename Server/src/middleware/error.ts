import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.status ?? 500;
  const message =
    err?.message ?? (typeof err === 'string' ? err : 'Internal Server Error');
  res.status(status).json({ error: { code: status === 500 ? 'INTERNAL_ERROR' : 'ERROR', message } });
}
export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
}