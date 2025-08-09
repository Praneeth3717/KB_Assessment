# Notepad Application

A full-stack note-taking application built with React and Node.js, featuring Google OAuth authentication and CRUD operations for notes.

## Features

- **Authentication**: Login/Register with email & password or Google OAuth
- **Note Management**: Create, read, update, and delete notes
- **Note Categories**: Organize notes by type (Personal, Home, Business)
- **Filtering**: Filter notes by category
- **Responsive Design**: Mobile-friendly interface
- **Secure**: JWT-based authentication with HTTP-only cookies

## Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Google OAuth 2.0** - Social authentication

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── auth/          # Authentication components
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions and API calls
│   │   └── ...
│   └── ...
└── server/                # Backend Node.js application
    ├── config/           # Database configuration
    ├── controllers/      # Route handlers
    ├── middleware/       # Custom middleware
    ├── models/           # Database models
    ├── routes/           # API routes
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Google Cloud Console project (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Praneeth3717/KB_Assessment.git
   cd notepad-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# Port
PORT=5000
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback` (development)
   - `your-backend-url/auth/google/callback` (production)
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `your-frontend-url` (production)

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

3. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication Routes
```
POST   /auth/register          # Register with email/password
POST   /auth/login             # Login with email/password
GET    /auth/google/login      # Initiate Google OAuth
GET    /auth/google/callback   # Google OAuth callback
GET    /auth/verify            # Verify JWT token
POST   /auth/logout            # Logout user
```

### Notes Routes
```
GET    /notes/get              # Get all user notes
POST   /notes/add              # Create new note
PUT    /notes/:id              # Update existing note
DELETE /notes/:id              # Delete note
```

## Database Schema

### User Model
```javascript
{
  googleId: String,      // Google OAuth ID (optional)
  name: String,          // User's full name
  email: String,         // Email address (unique)
  password: String,      // Hashed password (optional for Google users)
  createdAt: Date,       // Account creation date
  updatedAt: Date        // Last update date
}
```

### Note Model
```javascript
{
  userId: ObjectId,      // Reference to User
  title: String,         // Note title
  description: String,   // Note content
  type: String,          // Category: 'personal' | 'home' | 'business'
  createdAt: Date,       // Creation date
  updatedAt: Date        // Last update date
}
```

## Authentication Flow

1. **Email/Password**: Users register/login with credentials, receive JWT token in HTTP-only cookie
2. **Google OAuth**: Users authenticate with Google, receive JWT token in HTTP-only cookie
3. **Protected Routes**: JWT token verified via middleware for secure endpoints

## Security Features

- Passwords hashed with bcrypt
- JWT tokens stored in HTTP-only cookies
- CORS configured for specific origins
- Input validation on server-side
- Protected routes require authentication

## Deployment

### Backend (Render/Heroku)
1. Create new web service
2. Connect GitHub repository
3. Set environment variables
4. Deploy from `server` directory

### Frontend (Vercel/Netlify)
1. Create new project
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy from `client` directory

### Environment Variables for Production
Update your `.env` file with production URLs:
```env
FRONTEND_URL=https://your-frontend-domain.com
BACKEND_URL=https://your-backend-domain.com
```

## Development Scripts

### Client
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Server
```bash
npm run dev        # Start with nodemon
npm start          # Start production server
```
