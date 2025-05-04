import { generateToken } from './auth.js';
const payload = {
  userId: 1,
  role: 'admin',
};

const token = generateToken(32);
console.log('Your JWT token:', token);
