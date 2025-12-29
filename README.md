# 🏫 Campus Facility Management

A full-stack Campus Facility Management system where students and staff can log in to report facility issues, while administrators manage, view, and respond to these reports through a secure role-based system.

### 🚀 Live Demo
Live Site: [Campus Facility Management](https://campusfacilitymanagement-1.onrender.com/)

Backend API: [Backend API](https://campusfacilitymanagement.onrender.com)

## 🛠 Tech Stack

### Frontend

React.js

pure CSS

### Backend

Node.js

Express.js

mongodb atlas 

### Deployment

Render.com

## ✨ Main Features

### 👥 Users (Students/Staff)

Secure login and registration

Report facility issues (e.g., broken equipment, maintenance requests)

Track the status of submitted reports

### 🛠 Admins

Secure login using email and password

View all submitted reports

Respond to reports and update status

Access protected admin routes

### 🛡 Super Admin (if applicable)

Full system control

Create, update, or remove admin accounts

Manage privileges for admins

Oversee all facility reports

## 🔐 Security

Role-based access control (RBAC)

Protected routes for admins and super admins

Public access limited to report submission (if allowed)

## 📁 Project Structure

campus-facility-management/

├── backend

│   ├── routes

│   ├── controllers

│   ├── middleware

│   ├── models

│   ├── config

│   └── server.js

├── frontend

│   ├── src

│   │   ├── components

│   │   ├── pages

│   │   ├── store

│   │   └── main.jsx

└── README.md


## ⚙️ Environment Variables

The backend uses environment variables for configuration.

.env

Example:

PORT=3000

MONGODB_URL='your_database_url_here'

JWT_SECRET='your_secret_key'

TOKEN_EXPIRE='1d'



## ▶️ Run Locally

### Backend

cd backend

npm install

npm run dev


### Frontend

cd frontend

npm install

npm run dev


## 📡 API Overview

Method	Endpoint	Description

GET	/issue	Get all reports (admin)

GET	/issue/:id	Get a single report (admin)

POST	/issue/add	Submit a new report (user)

PUT	/reports/respond/:id	Respond to a report (admin)

POST	/user/login	User/Admin login

POST	/user/register	Admin registration (superadmin)

PUT	/user/update/:id	Update profile (admin/superadmin)

DELETE	/user/delete/:id	Remove admin (superadmin)

## 🧠 What This Project Demonstrates

Full-stack application architecture

RESTful API design

Role-based authentication & authorization

Secure environment variable handling

Production deployment with Render

## 📌 Future Improvements

notifications for report updates on the app

Dashboard analytics for admins

File attachment support for reports

Advanced filtering and reporting system

## 👤 Author

Teumay Werashe

⭐ If you like this project, feel free to give it a star!
