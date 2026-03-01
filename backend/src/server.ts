import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import vehicleRoutes from './routes/vehicles.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://drive-defined.vercel.app'] 
    : ['http://localhost:8080', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/vehicles', vehicleRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: 'connected' 
  });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'AutoDrive Kenya API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      vehicles: '/api/vehicles',
      featured: '/api/vehicles/featured',
      vehicleById: '/api/vehicles/:id'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/vehicles`);
  console.log(`   GET  /api/vehicles/featured`);
  console.log(`   GET  /api/vehicles/:id`);
  console.log(`   GET  /`);
});

export default app;
