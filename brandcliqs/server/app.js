import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import miscRoutes from './routes/miscRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import errorHandler from './middleware/error.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '1mb',
  })
);

app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/api/health', (req, res) =>
  res.json({
    ok: true,
    service: 'BrandCliqs API',
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use(
  '/api/recommendations',
  recommendationRoutes
);
app.use('/api', miscRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

export default app;