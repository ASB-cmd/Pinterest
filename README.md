# Pinterest Clone - Full-Stack App

This is a **Full-Stack Pinterest Clone** built using **React, Node.js, MongoDB, and Zustand**. The app includes **JWT authentication**, **cookie-based sessions**, **REST APIs**, and **photo editing features**.

## Features
- **User Authentication** (JWT & Cookies)
- **Image Upload & Editing**
- **Save & Organize Pins**
- **Zustand for State Management**
- **REST API for Backend**
- **MongoDB for Database**

## Tech Stack
- **Frontend**: React, Zustand, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pinterest-clone.git
cd pinterest-clone
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../client
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file inside the `backend/` directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 4. Run the Application

#### Start Backend Server
```bash
cd backend
npm start
```

#### Start Frontend Server
```bash
cd ../client
npm start
```

### 5. Open in Browser
Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and return JWT token
- `POST /api/auth/logout` - Logout user

### Pins
- `POST /api/pins` - Create a new pin
- `GET /api/pins` - Fetch all pins
- `GET /api/pins/:id` - Fetch a single pin
- `DELETE /api/pins/:id` - Delete a pin
