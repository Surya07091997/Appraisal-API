import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import appraisalRoutes from './routes/appraisal.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/appraisal', appraisalRoutes);

app.listen(3000, () => console.log('API running on http://localhost:3000'));
