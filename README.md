# MERN E-Commerce Website

![HOME PAGE](![Screenshot 2025-02-25 144459](https://github.com/user-attachments/assets/4dc21a00-42ec-4ff7-9d64-2c1979b16b42)




This is a full-stack e-commerce web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project includes a user-friendly frontend, a robust backend, authentication, and an admin panel for managing products and orders.

## Features

- User authentication (Signup, Login, Logout)
- Product listing and search functionality
- Add to cart and checkout process
- Admin panel for product and order management
- Secure API with JWT authentication
- MongoDB database integration

 ![LOGIN PAGE](![Screenshot 2025-02-25 144529](https://github.com/user-attachments/assets/804ee4ec-9ae1-42c3-ad87-d9ff3fa6ded2)



 ![LOGOUT PAGE]![Screenshot 2025-02-25 144555](https://github.com/user-attachments/assets/d6b7e560-6255-4fa0-8b10-2b5b428616c1)




## Tech Stack

### Frontend:
- React.js with Vite
- Tailwind CSS
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

## Project Structure

```
/e-commerce
│── /admin (Admin Panel Frontend)
│── /frontend (User Frontend)
│── /backend (Node.js & Express API)
│── package.json
│── README.md
```

## Installation

### Prerequisites:
- Node.js installed
- MongoDB setup (local or cloud)

### Steps to Run the Project:

#### 1. Clone the repository:
```sh
 git clone (https://github.com/ashrafkhan9/rabbit-ecom)
 cd e-commerce
```

#### 2. Install dependencies:
```sh
 cd backend
 npm install
 cd ../frontend
 npm install
```

#### 3. Set up environment variables:
Create a `.env` file in the backend folder with the following details:
```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### 4. Run the Backend:
```sh
 cd backend
 npm start
```

#### 5. Run the Frontend:
```sh
 cd frontend
 npm run dev
```

## Deployment

### Frontend Deployment (Vercel/Netlify):
- Build the project: `npm run build`
- Deploy using Vercel or Netlify

### Backend Deployment (Render/Heroku/VPS):
- Use `process.env.PORT` in the backend
- Deploy on Render, Heroku, or a VPS

LIVE-LINK: https://rabbit-ecom-r9ur.vercel.app/


