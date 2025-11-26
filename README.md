# TinyLink – MERN URL Shortener

TinyLink is a full-stack URL shortener built with the MERN stack. The backend exposes REST APIs for creating, listing, tracking, and deleting links, while the React frontend offers a polished dashboard for managing them.

## Tech Stack
- **Frontend:** React 18, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose, nanoid, validator
- **Database:** MongoDB Atlas (or any Mongo instance)

## Features
- Create short links with auto-generated or custom 6–8 character codes
- Automatic `https://` prefixing for bare domains
- Real-time click tracking and last-click timestamps
- Searchable, responsive dashboard with copy-to-clipboard helpers
- Dedicated stats page with live polling every 2 seconds
- Safe deletion with confirmation prompts and detailed error handling

## Repository Layout
```
backend/
  src/
    config/        # Mongo connection helper
    controllers/   # Link CRUD + redirect handlers
    middleware/    # Error translator
    models/        # Mongoose schemas
    routes/        # REST + redirect routers
frontend/
  src/
    components/    # Header, LinkForm, LinkTable
    pages/         # Dashboard, LinkStats
    services/      # Axios wrapper
```

## Environment Variables
Create a `.env` in `backend/`:
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
CLIENT_URL=https://your-frontend-domain
BASE_URL=https://your-backend-domain
```

Create a `.env` in `frontend/`:
```
REACT_APP_API_URL=https://your-backend-domain
REACT_APP_BASE_URL=https://your-backend-domain
```

## Running Locally
```bash
# backend
cd backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm start
```
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`

## Core API Endpoints
- `POST /api/links` – create a short link `{ url, code? }`
- `GET /api/links` – list all links (newest first)
- `GET /api/links/:code` – fetch stats for a single link
- `DELETE /api/links/:code` – remove a link
- `GET /:code` – redirect short link to the long URL while incrementing click stats

All endpoints return JSON; errors use `{ error: string }` with appropriate HTTP status codes (400 validation, 404 not found, 409 duplicates, 500 server issues).

## Deployment Notes
- Backend is Render-ready: bind to `0.0.0.0`, read `PORT`, and supply Mongo + CORS env vars.
- Frontend can be deployed to Render, Netlify, or Vercel; remember to set the two `REACT_APP_*` variables before building.
- Use `BASE_URL`/`CLIENT_URL` (backend) and `REACT_APP_*` (frontend) to keep cross-origin calls aligned between environments.

## Troubleshooting
- **CORS errors:** confirm `CLIENT_URL` (backend) and `REACT_APP_API_URL` (frontend) match the deployed domains.
- **Duplicate code errors:** backend returns 409 with `Code already exists`; pick another code or let TinyLink auto-generate.
- **Clipboard issues:** older browsers fall back to the `textarea` copy shim in `LinkTable.js`.

TinyLink demonstrates a clean, production-ready MERN architecture with clear separation between API logic and UI. Customize it further by adding authentication, per-user link tracking, or analytics dashboards. Enjoy! 🎯

