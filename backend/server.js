import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiry.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database connection
connectDB();

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'MongoDB Atlas' : 'In-Memory Fallback',
    timestamp: new Date()
  });
});

// Public Routes
app.use('/api', enquiryRoutes);

// Admin Routes (protected by x-admin-secret header)
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`[SERVER] Running on port ${PORT}`);
});
