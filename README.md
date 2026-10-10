# CS696 Authentication Service

A simple Node.js authentication API built with Express, MongoDB, and JWT-based session handling. This project provides user signup/login, token refresh, logout, and protected route access using HTTP-only cookies.

## Features

- User registration (`/api/auth/signup`)
- User login (`/api/auth/login`)
- JWT access and refresh token generation
- Secure cookie-based auth flow
- Protected route middleware
- MongoDB persistence using Mongoose
- Rate limiting on login attempts
- Docker support for running the API and supporting services

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- bcrypt for password hashing
- Helmet, CORS, Cookie Parser
- Docker / Docker Compose

## Project Structure

```text
.
├── .env
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── src
│   ├── middleware
│   │   └── requireAuth.js
│   ├── models
│   │   └── User.js
│   ├── routes
│   │   └── auth.js
│   ├── tests
│   └── utils
│       └── jwt.js
└── README.md
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=8000
NODE_ENV=development

MONGODB_URL=mongodb://localhost:27017/user-auth
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
FRONTEND_ORIGIN=http://localhost:3000
```

Notes:
- `MONGODB_URL` should point to your MongoDB instance.
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` should be strong random values.
- `FRONTEND_ORIGIN` is used for CORS configuration.

## Installation

```bash
npm install
```

## Run Locally

```bash
node server.js
```

The API will start on:

```text
http://localhost:8000
```

## Docker Setup

This repo includes a Docker Compose configuration to run the app with MongoDB and observability services.

```bash
docker compose up --build
```

The services include:
- API server
- MongoDB
- Loki
- Grafana

## API Endpoints

### `POST /api/auth/signup`
Creates a new user.

Request body:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "id": "...",
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com"
}
```

### `POST /api/auth/login`
Logs in a user and sets authentication cookies.

Request body:
```json
{
  "emailOrUsername": "johndoe",
  "password": "password123"
}
```

### `POST /api/auth/refresh`
Refreshes the JWT pair using the refresh token cookie.

### `POST /api/auth/logout`
Clears the auth cookies.

### `GET /api/auth/me`
Protected route that returns the authenticated user's information.

## Authentication Behavior

- Passwords are hashed using `bcrypt` before saving to MongoDB.
- Access and refresh tokens are generated using JWT.
- Tokens are stored in secure HTTP-only cookies.
- Protected routes are gated using the `requireAuth` middleware.

## Notes

This repository is structured as a basic authentication backend and is intended to be used with a frontend application or API client. It is a good starting point for learning Node.js + Express + MongoDB authentication patterns.

## License

This project does not currently include a project-specific license file.
