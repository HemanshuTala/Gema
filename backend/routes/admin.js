import express from 'express';
import { Enquiry } from '../models/Enquiry.js';
import mongoose from 'mongoose';
import { tempEnquiriesDb } from './enquiry.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

// Middleware: verify admin secret key
const requireAdmin = (req, res, next) => {
  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing admin key.' });
  }
  next();
};

// GET /api/admin/enquiries — all enquiries with optional search & pagination
router.get('/enquiries', requireAdmin, async (req, res) => {
  try {
    const { search = '', page = 1, limit = 20, sort = 'desc' } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const sortOrder = sort === 'asc' ? 1 : -1;

    if (isDbConnected()) {
      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { phone: { $regex: search, $options: 'i' } }
            ]
          }
        : {};

      const total = await Enquiry.countDocuments(query);
      const enquiries = await Enquiry.find(query)
        .sort({ createdAt: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      // Stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayCount = await Enquiry.countDocuments({ createdAt: { $gte: today } });

      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - 7);
      const weekCount = await Enquiry.countDocuments({ createdAt: { $gte: thisWeek } });

      return res.json({
        source: 'mongodb',
        stats: {
          total,
          today: todayCount,
          thisWeek: weekCount
        },
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        },
        data: enquiries
      });

    } else {
      // In-memory fallback
      let filtered = tempEnquiriesDb;
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(e =>
          e.name.toLowerCase().includes(s) ||
          e.email.toLowerCase().includes(s) ||
          e.phone.includes(s)
        );
      }
      const sorted = [...filtered].sort((a, b) =>
        sortOrder === 1
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
      const total = sorted.length;
      const paginated = sorted.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayCount = filtered.filter(e => new Date(e.createdAt) >= today).length;

      return res.json({
        source: 'in-memory',
        stats: { total, today: todayCount, thisWeek: total },
        pagination: { page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
        data: paginated
      });
    }
  } catch (err) {
    console.error('[ADMIN] Error fetching enquiries:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/enquiries/:id — delete a single enquiry
router.delete('/enquiries/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Enquiry not found' });
      console.log('[ADMIN] Deleted enquiry:', id);
      return res.json({ success: true, message: 'Enquiry deleted successfully' });
    } else {
      const idx = tempEnquiriesDb.findIndex(e => e._id === id);
      if (idx === -1) return res.status(404).json({ error: 'Enquiry not found' });
      tempEnquiriesDb.splice(idx, 1);
      return res.json({ success: true, message: 'Enquiry deleted from memory' });
    }
  } catch (err) {
    console.error('[ADMIN] Delete error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
