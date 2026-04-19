# 🏋️ GymGravity - Online Gym Equipment Store

A full-stack MERN e-commerce application with a physics-based Anti-Gravity UI.

## 🚀 Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally (or a MongoDB Atlas URI)

### 1. Setup Backend
1. Open a terminal in the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database with initial products and users:
   ```bash
   npm run data:import
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will run on [http://localhost:5000](http://localhost:5000)*

### 2. Setup Frontend
1. Open a new terminal in the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will be available at [http://localhost:5173](http://localhost:5173)*

## 🛠️ Features
- **Anti-Gravity UI**: Periodic physics simulations on the homepage using `matter-js`.
- **User Auth**: JWT-based login and registration with persistent sessions.
- **E-commerce**: Product catalog, shopping cart (localStorage), and checkout flow.
- **Admin Panel**: Manage products and view orders/users.

## 🔑 Default Credentials
- **Admin**: `admin@example.com` / `password123`
- **User**: `john@example.com` / `password123`
