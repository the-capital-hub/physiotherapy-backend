# PhysioCare Backend

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set MongoDB, JWT secret and admin credentials.
4. `node src/createAdmin.js`
5. `npm run dev`

API: `http://localhost:5000`

- `POST /api/auth/login`
- `POST /api/appointments` (public booking)
- `GET /api/appointments` (Bearer token required)
- `PATCH /api/appointments/:id/status` (Bearer token required)
"# physiotherapy-backend" 
