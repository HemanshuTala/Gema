import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.warn('[DB] MONGO_URI not set in environment. Running in in-memory fallback mode.');
    return false;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('[DB] MongoDB Atlas connected successfully');
    return true;
  } catch (err) {
    console.warn('[DB] MongoDB connection failed. Switching to in-memory fallback.', err.message);
    return false;
  }
};
