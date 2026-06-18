# 📚 StudyCircle — Student Group Learning Platform

A full-stack learning platform where students collaborate in study groups, share resources, ask doubts, and receive verified answers from teachers.

Built to demonstrate real-world backend architecture, authentication, role-based access control, and scalable API design.

---

## 🚀 Overview

Students often face challenges such as:

* Finding focused study communities
* Organizing study materials
* Getting doubts resolved quickly
* Collaborating effectively with peers

**StudyCircle** provides a centralized platform to solve these problems through group-based learning and teacher-guided discussions.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing
* Student and Teacher roles
* Protected API routes
* Role-based access control

### 👥 Study Groups

* Create study groups
* Join groups using unique join codes
* Group creator automatically becomes Admin
* Add teachers to groups
* Manage group members

### 📚 Resource Sharing

* Share study resources via links
* Group-specific resource management
* View all shared resources within a group
* Delete resources when needed

### ❓ Doubt Discussion System

* Students can ask questions
* Group members can view discussions
* Structured question format:

  * Title
  * Description

### ✅ Verified Teacher Answers

* Only teachers can answer questions
* Answers marked as verified
* Dedicated answer threads
* Teacher-only answer interface

### 👤 Member Management

Supported roles:

* Student
* Teacher
* Admin

Admins can:

* View members
* Remove members
* Manage group participation

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* MVC Architecture
* Service Layer Pattern

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Context API
* Role-Based UI Rendering

---

## 📂 Project Structure

```bash
STUDYCIRCLE/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── uploads/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│
└── README.md
```

---

## 🔄 Application Workflow

### 1️⃣ Authentication

Users can:

* Register as Student or Teacher
* Login securely
* Receive JWT token
* Access protected features

---

### 2️⃣ Dashboard

After login users can:

* View joined groups
* Create new groups
* Join existing groups using join codes

---

### 3️⃣ Group Hub

Each group contains:

* Resources
* Questions
* Teacher Answers
* Members List

---

### 4️⃣ Doubt Resolution Flow

```text
Student asks question
        ↓
Teacher reviews question
        ↓
Teacher posts verified answer
        ↓
Students learn and discuss
```

---

## 🔑 API Modules

| Module    | Endpoints                                     |
| --------- | --------------------------------------------- |
| Auth      | Register, Login, Me                           |
| Groups    | Create, Join, List, Delete                    |
| Resources | Add Resource, List Resources, Delete Resource |
| Questions | Ask Question, List Questions, Delete Question |
| Answers   | Teacher Answer, List Answers                  |
| Members   | List Members, Remove Member                   |

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Manojuio/STUDYCIRCLE.git
cd STUDYCIRCLE
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 📈 Future Enhancements

Planned for Phase 2:

* Real-Time Group Chat (WebSockets)
* Notification System
* PDF/File Upload Support
* Search & Filtering
* Pagination
* Activity Tracking
* Group Analytics
* Deployment (Render + Vercel)
* Email Notifications

---

## 🎯 Learning Outcomes

This project demonstrates:

* REST API Development
* Authentication & Authorization
* Role-Based Access Control
* MongoDB Data Modeling
* MVC + Service Architecture
* Frontend & Backend Integration
* Scalable Project Structure
* Real-World Software Design

---

## 👨‍💻 Author

**Manoj Kumar**

Computer Science Student | Backend Development Enthusiast | AI & System Design Learner

GitHub: https://github.com/Manojuio

LinkedIn: https://www.linkedin.com/in/manoj-kumar-632b26231

---

## ⭐ Support

If you found this project useful:

* Star the repository ⭐
* Fork the project 🍴
* Share feedback 💡
* Contribute improvements 🚀

---

### Building projects. Learning systems. Growing every day.
