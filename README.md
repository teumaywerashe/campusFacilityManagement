# Campus Facility Management

A full-stack web application where students and staff can report campus facility issues, and administrators can manage, track, and respond to those reports through a role-based dashboard.

**Live Site:** [campusfacilitymanagement-1.onrender.com](https://campusfacilitymanagement-1.onrender.com)  
**Backend API:** [campusfacilitymanagement.onrender.com](https://campusfacilitymanagement.onrender.com)  
**API Docs:** [/api-docs](https://campusfacilitymanagement.onrender.com/api-docs)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT (JSON Web Tokens) |
| Image Storage | Cloudinary |
| Email | Nodemailer |
| Deployment | Render.com |

---

## Features

### Users (Students / Staff)
- Register and log in securely
- Submit facility issue reports with an image and description
- Track the status of submitted reports (Pending / In Progress / Resolved)
- Receive in-app notifications when report status is updated
- Comment on their own reports
- Reset password via email link

### Admins
- View all submitted reports in a dashboard
- Update report status and notify the reporter automatically
- Comment on reports
- Delete reports (image is also removed from Cloudinary)
- View and manage notifications

---

## Project Structure

```
campusFacilityManagement/
├── backend/
│   ├── config/
│   │   ├── db.ts               # MongoDB connection
│   │   └── cloudinary.ts       # Cloudinary config
│   ├── controller/
│   │   ├── userController.ts
│   │   ├── issueController.ts
│   │   ├── commentController.ts
│   │   └── notificationController.ts
│   ├── middleWares/
│   │   └── auth.ts             # JWT auth middleware
│   ├── models/
│   │   ├── User.ts
│   │   ├── Issue.ts
│   │   ├── coments.ts
│   │   └── Notification.ts
│   ├── route/
│   │   ├── userRoute.ts
│   │   ├── issueRouter.ts
│   │   ├── commentRouter.ts
│   │   └── notificationRouter.ts
│   ├── server.ts
│   └── swagger.ts
│
└── frontend/
    └── src/
        ├── components/         # All UI components
        ├── context/
        │   └── store.tsx       # Global state (React Context)
        ├── pages/              # Admin, User, Home pages
        └── main.tsx
```

---

## Environment Variables

### Backend — `backend/.env`

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary (image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:5173
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Overview

### Auth — `/user`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/user/register` | Register a new user | No |
| POST | `/user/login` | Login | No |
| GET | `/user/get/:id` | Get user profile | Yes |
| POST | `/user/forgot-password` | Send password reset email | No |
| POST | `/user/reset-password/:token` | Reset password | No |

### Issues — `/issue`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/issue/report` | Submit a new report (with image) | Yes |
| GET | `/issue/get` | Get all reports (admin) | Yes |
| GET | `/issue/get/:id` | Get reports by user | Yes |
| PATCH | `/issue/update/:id` | Update report status | Yes |
| DELETE | `/issue/remove/:id` | Delete a report | Yes |

### Comments — `/comment`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/comment` | Add a comment to a report | Yes |

### Notifications — `/notification`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/notification/get` | Get all notifications | No |
| GET | `/notification/get/:id` | Get notifications for a user | No |
| POST | `/notification/create` | Create a notification | No |
| PATCH | `/notification/update/:id` | Mark notification as read | No |
| DELETE | `/notification/delete/:id` | Delete a notification | No |

---

## Author

**Teumay Werashe**
