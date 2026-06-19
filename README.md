# Kidrove – AI & Robotics Summer Workshop

Workshop landing page built for the Kidrove internship assignment.

---

## Project Structure

```
gema/
├── frontend/    Vite + React + TypeScript + Tailwind CSS
└── backend/     Node.js + Express.js + MongoDB Atlas
```

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:5000`

The `.env` file is already configured with the MongoDB Atlas connection.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

## Admin Dashboard

To view all workshop registrations, open the admin portal:

```
http://localhost:5173/admin
```

**Password:** `kidrove-admin-2026`

From the dashboard you can:
- See total, today's, and this week's registration counts
- Search registrations by name, email, or phone
- Sort by newest or oldest
- Delete any registration
- Export the list as a CSV file

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/status | Check server and DB status |
| POST | /api/enquiry | Submit a registration |
| GET | /api/admin/enquiries | List all registrations (requires admin header) |
| DELETE | /api/admin/enquiries/:id | Delete a registration (requires admin header) |

### POST /api/enquiry

```json
{
  "name": "Aarav Sharma",
  "email": "parent@example.com",
  "phone": "9876543210"
}
```

Validation handled on both frontend and backend:
- All three fields are required
- Name must be at least 2 characters
- Email must be a valid format
- Phone must be a valid 10-digit number
- Duplicate emails return HTTP 409

---

## Submission Note

**Approach:**
I split the project into a React + TypeScript + Tailwind frontend and an Express + MongoDB backend. On the UI side I focused on making it feel polished — smooth animations, a clean color system, and a layout that works well on mobile and desktop. Validation runs on both the client (real-time inline errors) and the server so bad data never reaches the database. If MongoDB is down the backend falls back to in-memory storage so registrations still go through.

**What I'd improve with more time:**
1. Send a confirmation email to the parent as soon as they register using Nodemailer.
2. Add proper JWT-based authentication to the admin dashboard instead of a shared password.
3. Write end-to-end tests with Playwright covering the full registration flow and edge cases.
