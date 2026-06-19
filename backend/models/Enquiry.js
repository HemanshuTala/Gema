import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  phone: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^\+?[1-9]\d{6,14}$|^[0-9]{10}$/, 'Please enter a valid phone number']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
