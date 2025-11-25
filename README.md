# TinyLink - URL Shortener

A complete MERN stack URL shortener application built according to the Aganitha take-home assignment specification.

## 🚀 Features

- **URL Shortening**: Create short links with auto-generated or custom codes (6-8 alphanumeric characters)
- **Analytics**: Track clicks, creation dates, and last accessed times
- **Search & Filter**: Find links quickly by code or URL
- **Responsive Design**: Clean Tailwind CSS interface that works on all devices
- **Copy to Clipboard**: One-click copying of short URLs
- **Link Management**: View detailed stats and delete links
- **Redirect Tracking**: Automatic click counting and timestamp updates

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Custom validation for URLs and codes

## 📁 Project Structure

```
tinylink/
├── backend/
│   ├── src/
│   │   ├── index.js             # Express entry
│   │   ├── config/              # Mongo connection
│   │   ├── controllers/         # API logic
│   │   ├── middleware/          # Error handling
│   │   ├── models/              # Schemas
│   │   └── routes/              # API + redirect routes
│   ├── .env.example             # Backend environment template
│   ├── package.json             # Backend dependencies
│   └── package-lock.json
├── frontend/
│   ├── public/
│   │   ├── _redirects           # SPA routing fallback
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation
│   │   │   ├── LinkForm.js      # Create link form
│   │   │   └── LinkTable.js     # Links table
│   │   ├── pages/
│   │   │   ├── Dashboard.js     # Main page (/)
│   │   │   └── LinkStats.js     # Stats page (/code/:code)
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── App.js               # Main component
│   │   ├── index.css            # Tailwind styles
│   │   └── index.js             # React entry
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies
│   ├── tailwind.config.js       # Tailwind config
│   └── postcss.config.js        # PostCSS config
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd tinylink
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file from `.env.example`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tinylink?retryWrites=true&w=majority
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file from `.env.example`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_BASE_URL=http://localhost:5000
```

> ℹ️ Keep `public/_redirects` in your build output so `/code/:code` routes continue to work when deployed to Render Static Sites (rewrites all paths to `index.html`).

## 🚀 Running the Application

### Development Mode

**Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Start Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

## 📡 API Specification

### Health Check
```http
GET /healthz
Response: { "ok": true, "version": "1.0" }
```

### Create Link
```http
POST /api/links
Body: { "url": "https://example.com", "code": "abc123" }
Response: { "code": "abc123", "url": "https://example.com", "clicks": 0, "lastClicked": null, "createdAt": "2023-10-01T12:00:00.000Z" }
```

### Get All Links
```http
GET /api/links
Response: [{ "code": "abc123", "url": "https://example.com", "clicks": 5, "lastClicked": "2023-10-01T15:30:00.000Z", "createdAt": "2023-10-01T12:00:00.000Z" }]
```

### Get Link Stats
```http
GET /api/links/:code
Response: { "code": "abc123", "url": "https://example.com", "clicks": 5, "lastClicked": "2023-10-01T15:30:00.000Z", "createdAt": "2023-10-01T12:00:00.000Z" }
```

### Delete Link
```http
DELETE /api/links/:code
Response: { "ok": true }
```

### Redirect
```http
GET /:code
Response: 302 Redirect to original URL (increments clicks, updates lastClicked)
```

## 🎨 Frontend Pages

### Dashboard (/)
- Create link form with URL and optional custom code input
- Validation: URL format, code format (6-8 alphanumeric)
- Links table with search/filter functionality
- Copy buttons for short URLs
- Delete functionality with confirmation
- Responsive design

### Stats Page (/code/:code)
- Individual link statistics
- Test link functionality (opens /:code in new tab)
- Copy short URL button
- Delete link option
- Loading and error states

## 🔒 Validation Rules

### URL Validation
- Must be a valid URL format
- Automatically adds https:// if missing protocol

### Code Validation
- Must match `/^[A-Za-z0-9]{6,8}$/` pattern
- Must be unique across all links
- Returns 409 error if duplicate

## 🗄️ Database Schema

```javascript
{
  code: String,        // Unique short code (6-8 alphanumeric)
  url: String,         // Original URL
  clicks: Number,      // Click count (default: 0)
  lastClicked: Date,   // Last access timestamp (default: null)
  createdAt: Date      // Creation timestamp (default: Date.now)
}
```

## 🚀 Deployment

### Backend (Render/Railway)
1. Create a Web Service pointing to the `backend` directory
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Environment Variables:
   - `MONGODB_URI`
   - `BASE_URL=https://your-app.onrender.com`
   - `CLIENT_URL=https://your-frontend.onrender.com`
   - `NODE_ENV=production`

### Frontend (Render Static / Vercel)
1. Deploy the `frontend` directory as a static site (Render Static Site or Vercel CRA preset)
2. Build Command: `npm install && npm run build`
3. Output/Publish Directory: `build`
4. Environment Variables:
   - `REACT_APP_API_URL=https://your-backend.onrender.com`
   - `REACT_APP_BASE_URL=https://your-backend.onrender.com`
5. Include `public/_redirects` so `/code/:code` refreshes resolve to `index.html`.

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Create database user with read/write permissions
3. Whitelist IP addresses (0.0.0.0/0 for production)
4. Get connection string for `MONGODB_URI`

## ✅ Testing Checklist

### API Endpoints
- [ ] POST /api/links creates link with valid data
- [ ] POST /api/links validates URL format
- [ ] POST /api/links validates code format (6-8 alphanumeric)
- [ ] POST /api/links returns 409 for duplicate codes
- [ ] GET /api/links returns all links sorted by createdAt DESC
- [ ] GET /api/links/:code returns single link stats
- [ ] GET /api/links/:code returns 404 for non-existent codes
- [ ] DELETE /api/links/:code deletes link and returns { ok: true }
- [ ] DELETE /api/links/:code returns 404 for non-existent codes
- [ ] GET /:code redirects with 302 status
- [ ] GET /:code increments clicks and updates lastClicked
- [ ] GET /:code returns 404 JSON for non-existent codes
- [ ] GET /healthz returns { ok: true, version: "1.0" }

### Frontend Features
- [ ] Dashboard loads and displays create form
- [ ] Form validates URL and code inputs
- [ ] Form shows inline error messages
- [ ] Form disables button during submission
- [ ] Form shows success message after creation
- [ ] Links table displays all links with proper columns
- [ ] Search/filter works for both code and URL
- [ ] Copy buttons work and show feedback
- [ ] Delete buttons show confirmation and work
- [ ] Stats page loads for valid codes
- [ ] Stats page shows 404 for invalid codes
- [ ] Test link opens /:code in new tab
- [ ] All pages are responsive
- [ ] Loading and error states work properly

## 📝 License

MIT License

## 🤝 Contributing

This project follows the exact specification from the Aganitha take-home assignment. Please ensure any contributions maintain compliance with the original requirements.