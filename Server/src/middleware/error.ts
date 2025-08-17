import type { Request, Response, NextFunction } from "express";

type WithStatus = { status?: number };

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = (err as WithStatus)?.status ?? 500;
  const message = err instanceof Error ? err.message : "Internal Server Error";
  console.error(err);
  res.status(status).json({ error: { message } });
}

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res
    .status(404)
    .json({ error: { code: "NOT_FOUND", message: "Route not found" } });
}
