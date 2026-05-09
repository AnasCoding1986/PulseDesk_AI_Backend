import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalErrorHandler } from './middleware/errorMiddleware';
import routes from './routes';
import { AppError } from './utils/AppError';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://pulse-desk-ai-frontend.vercel.app',
    process.env.CLIENT_URL || ''
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', routes);

// 404 handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
