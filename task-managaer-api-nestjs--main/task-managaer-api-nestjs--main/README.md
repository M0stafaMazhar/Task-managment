# 📝 Task Manager API

A simple task management backend built with **NestJS**, **MongoDB**, and **JWT authentication**.

---

## 🚀 Features

- User registration & login (with JWT)
- Prevents duplicate user registration (email validation)
- Authentication middleware
- Retrieve logged-in user data
- Global error handling
- MongoDB integration with Mongoose

---

---

## ⚙️ Installation

```bash
# Clone the repository

# Navigate into the project
cd task-manager-api

# Install dependencies
npm install

# Create your .env file
cp .env.example .env


🧪 Running the App
# Start in development mode (auto reload)
npm run start:dev
App runs by default on: http://localhost:3000

🔐 Environment Variables
Make sure your .env file includes:
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=SecretKey


📬 Postman Collection
You can test all endpoints using the included Postman collection in the postman/ folder:
📁 postman/
└── Task Manager API.postman_collection.json

```
