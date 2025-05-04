import { verifyToken } from '../auth.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  const payload = verifyToken(token);
  if (!payload) return res.status(403).json({ message: 'Token expired or invalid' });

  req.user = payload;
  next();
}
