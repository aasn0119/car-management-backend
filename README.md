### Car Management Application - Backend

This backend service provides a RESTful API for the Car Management Application, supporting user registration, authentication, and car management (CRUD operations). It is built with Node.js, Express, and MongoDB.

### Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

### Features

- User authentication with JWT.
- User registration and login.
- CRUD operations for managing cars (Create, Read, Update, Delete).
- Allows users to upload images for each car (up to 10 images).
- Search functionality for cars.

### Technologies

- **Node.js**
- **Express**
- **MongoDB & Mongoose**
- **JWT for Authentication**
- **Multer for File Uploads**

---

### Getting Started

#### Prerequisites

- Node.js and npm installed.
- MongoDB connection string.

#### Installation

1. Clone the repository.

   ```bash
   git clone <repository-url>
   cd car-management-backend
   ```

2. Install dependencies.
   ```bash
   npm install
   ```

---

### Environment Variables

Create a `.env` file in the root of the backend directory and add the following:

```plaintext
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

---

### Running Locally

1. Start the backend server.
   ```bash
   node index.js
   ```
2. The backend server should now be running on `http://localhost:5000`.

---

### API Documentation

The API documentation is available using Swagger at `/api/docs`. Visit `http://localhost:5000/api/docs` to view all endpoints and try them interactively.

---

### Deployment

To deploy the backend, follow these steps:

1. **Push Code to GitHub**: Ensure your code is available on GitHub or GitLab.
2. **Deploy on Render**:
   - Create a new web service on Render and connect the repository.
   - Set up environment variables (`MONGO_URI`, `JWT_SECRET`) in Render.
   - Define the build command as `npm install` and the start command as `node index.js`.
3. **Access Your Backend**: After deployment, Render will provide a public URL for your backend.

---

### Endpoints

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | /auth/register | Register a new user    |
| POST   | /auth/login    | Login an existing user |
| GET    | /cars          | Get all cars for user  |
| POST   | /cars          | Create a new car       |
| GET    | /cars/:id      | Get a car by ID        |
| PUT    | /cars/:id      | Update a car by ID     |
| DELETE | /cars/:id      | Delete a car by ID     |
