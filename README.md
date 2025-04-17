# 📝 Task Manager App

A full-stack task management application built with **NestJS** (backend) and **React** (frontend). It allows users to register, log in, and manage their own data securely using JWT-based authentication. MongoDB is used for data storage, and both API and UI are designed for scalability and clarity.


---

## 🚀 Features

- User registration and login with **JWT authentication**
- Duplicate email validation
- Protected routes via middleware
- Global error handling with custom error messages
- CORS enabled
- Organized code structure with MVC and modular architecture
- Postman collection for testing backend endpoints

---

## 🛠️ Technologies

### Backend:
- NestJS
- Node.js
- MongoDB + Mongoose
- JWT (Authentication)
- Postman (for testing)

### Frontend:
- React
- Axios
- Vite
- React Router DOM
- Bootstrap (for styling)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

```

###2. Setup Backend
```
cd backend
npm install
```

### Create a .env file in the backend directory:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```
#### Then run the server:
```
npm run start:dev
```
### 3. Setup Frontend
```
cd ../frontend
npm install
npm run dev
```
## 🔐 Authentication
JWT tokens are issued during login and used for protected routes.

Auth middleware is applied to endpoints requiring authentication.

User information is attached to requests for access control.

## 🧪 API Testing
You can find the Postman collection in the /postman folder to test all backend endpoints.

