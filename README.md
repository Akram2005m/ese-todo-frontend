# ESE Todo Frontend

A React-based frontend for a Todo application, built with Vite and connected to a Django REST API backend.

## Live Demo

- Frontend (local): Run via GitHub Codespaces
- Backend API: https://ese-todo-backend.onrender.com/api

## Tech Stack

- React 18
- Vite
- JWT authentication (stored in localStorage)
- Deployed via GitHub Codespaces (development)

## Architecture

This is the presentation layer in a three-layer enterprise architecture:
```
React Frontend (this repo) → Django REST API → PostgreSQL Database
```

The frontend communicates only with the REST API. It never accesses the database directly.

## Project Structure
```
ese-todo-frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components (Login, Register, Todos)
│   └── main.jsx       # App entry point
├── public/
├── index.html
└── vite.config.js
```

## Features

- User registration and login
- JWT-based authentication with token refresh
- Create, read, update, and delete todos
- Todo attributes: title, description, priority (low/medium/high), due date
- User-specific todos (each user sees only their own)

## Local Setup

### Prerequisites
- Node.js 18+
- npm

### Steps

1. Clone the repository
```bash
git clone https://github.com/Akram2005m/ese-todo-frontend
cd ese-todo-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file
```
VITE_API_URL=https://ese-todo-backend.onrender.com/api
```

4. Start the development server
```bash
npm run dev
```

App available at: http://localhost:5173

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Base URL of the Django REST API |

## Security

- JWT access and refresh tokens used for authentication
- Tokens stored in localStorage
- All API requests to protected endpoints include Authorization header
- Users can only view and manage their own todos

## AI Usage

Claude (Anthropic) was used to assist with debugging CORS issues, fixing environment variable configuration, and troubleshooting Vite dev server setup. All code was reviewed, understood, and integrated manually.
