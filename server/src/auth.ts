import { Request, Response, NextFunction } from 'express';

const ADMIN_KEY = process.env.ADMIN_API_KEY || '';

export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_KEY) return res.status(500).json({ error: 'admin api key not configured on server' });
  const key = req.headers['x-admin-key'] || req.query.admin_key;
  if (!key || key !== ADMIN_KEY) return res.status(401).json({ error: 'unauthorized' });
  next();
}
