import express from 'express';
import { Enquiry } from '../models/Enquiry.js';
import mongoose from 'mongoose';

const router = express.Router();

// Fallback in-memory database storage if MongoDB is offline
export const tempEnquiriesDb = [];

// Helper check to check if DB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

// GET /api/enquiry — list all enquiries (for testing/admin)
router.get('/enquiry', async (req, res) => {
  try {
    if (isDbConnected()) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(50);
      return res.json({ source: 'mongodb', count: enquiries.length, data: enquiries });
    } else {
      return res.json({ source: 'in-memory', count: tempEnquiriesDb.length, data: tempEnquiriesDb });
    }
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/enquiry
router.post('/enquiry', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Edge Case: Missing parameters
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields (name, email, phone) are required' });
    }

    // Edge Case: Validate Name length
    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }

    // Edge Case: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Edge Case: Phone number formatting & validation
    const cleanPhone = phone.trim().replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?[1-9]\d{6,14}$|^[0-9]{10}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Please enter a valid phone number (minimum 10 digits)' });
    }

    // Edge Case: Duplicate email check
    if (isDbConnected()) {
      const existing = await Enquiry.findOne({ email: email.trim().toLowerCase() });
      if (existing) {
        return res.status(409).json({ error: 'This email has already been registered. We will be in touch soon!' });
      }
    } else {
      const existingMem = tempEnquiriesDb.find(e => e.email === email.trim().toLowerCase());
      if (existingMem) {
        return res.status(409).json({ error: 'This email has already been registered. We will be in touch soon!' });
      }
    }

    const cleanData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone
    };

    if (isDbConnected()) {
      const newEnquiry = new Enquiry(cleanData);
      await newEnquiry.save();
      console.log('[INFO] Enquiry saved to MongoDB:', cleanData.email);
    } else {
      // In-Memory Database Fallback mode
      const offlineRecord = {
        ...cleanData,
        createdAt: new Date(),
        _id: 'mem_' + Math.random().toString(36).substring(2, 11)
      };
      tempEnquiriesDb.push(offlineRecord);
      console.log('[INFO] Saved to in-memory fallback:', offlineRecord);
    }

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: cleanData
    });

  } catch (error) {
    console.error('Error handling enquiry:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

export default router;
