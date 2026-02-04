 📚 StudyCircle — Student Group Learning Platform

StudyCircle is a full-stack student-centered learning platform where students can create or join study groups, share resources, ask doubts, and get verified answers from teachers.

This project is built to cover core backend + frontend concepts under one roof, including authentication, role-based access, group management, Q&A system, and scalable API structure.

---

# 🚀 Project Idea

Students often struggle with:

- Finding a focused study community  
- Sharing resources in one place  
- Getting doubts clarified by teachers  
- Maintaining group-based learning  

StudyCircle solves this by providing:

✅ Group-based learning hub  
✅ Resource sharing  
✅ Doubt asking + teacher answering  
✅ Role-based permissions  

---

# ✨ Features Implemented

## 🔐 Authentication (JWT)

- Register as Student or Teacher  
- Secure login with hashed passwords  
- JWT token-based protected routes  
- Role stored inside token  

---

## 👥 Groups System

- Students can create groups  
- Join groups using unique join codes  
- Group creator becomes Admin  
- Teachers can be added to groups  

---

## 📌 Resources Module (Links Only)

- Students can share study resources as links  
- Resources are group-specific  
- View all shared resources in group  

Endpoints:

- Add resource  
- List resources  
- Delete resource  

---

## ❓ Questions & Doubts Module

- Students can post questions inside groups  
- All members can view questions  
- Questions have title + description  

Endpoints:

- Ask question  
- List questions  
- Delete question  

---

## ✅ Teacher Answer System (Verified)

- Only teachers can answer questions  
- Students cannot answer  
- Answers are shown as verified teacher replies  

Includes:

- Question Detail Page  
- Answer thread display  
- Teacher-only answer input box  

---

## 👤 Members Management

- Group members stored in Member model  
- Admin can remove members  
- Roles supported:

- Student  
- Teacher  
- Admin  

---

# 🛠 Tech Stack

## Backend

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- MVC + Service Architecture  

## Frontend

- React (Vite)  
- React Router DOM  
- Axios (central API layer)  
- Role-based UI rendering  

---

# 📂 Project Structure

STUDYCIRCLE/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middlewares/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── services/
│ │ └── utils/
│ │
│ └── uploads/
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── App.jsx
│
└── README.md

yaml
Copy code

---

# 🔥 Complete Workflow

## 1. User Registers / Logs In

- JWT token issued  
- Stored in frontend localStorage  

---

## 2. Dashboard (After Login)

User can:

- View joined groups  
- Create new group (students only)  
- Join group via joinCode  

---

## 3. Enter Group Hub

Inside group:

- Resources section  
- Questions section  
- Teacher Answers section  
- Members list  

---

## 4. Doubt Solving Loop

Student asks → Teacher answers → Verified response shown

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Manojuio/STUDYCIRCLE.git
cd STUDYCIRCLE
2. Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
Backend runs on:

arduino
Copy code
http://localhost:5000
3. Frontend Setup
Open new terminal:

bash
Copy code
cd frontend
npm install
npm run dev
Frontend runs on:

arduino
Copy code
http://localhost:5173
🔑 API Modules Summary
Module	Key Endpoints
Auth	Register, Login, Me
Groups	Create, Join, List, Delete
Resources	Add Link, List, Delete
Questions	Ask, List, Delete
Answers	Teacher Only Answer + List
Members	List Members, Remove Member

📌 Future Improvements (Phase 2)
Planned features:

WebSocket Group Chat

Notifications system

File uploads (PDF Notes)

Deployment (Render + Vercel)

Search + Filters

Pagination for questions

🎯 Why This Project Matters
StudyCircle demonstrates:

✅ Real-world backend architecture
✅ Role-based authorization
✅ Full-stack integration
✅ Scalable API design
✅ Internship-level project complexity

👨‍💻 Author
Manoj Kumar
2nd Year Computer Science Student
Building full-stack + AI-integrated projects

GitHub: https://github.com/Manojuio

⭐ If you like this project
Give it a star ⭐ on GitHub and follow for more projects!

yaml
Copy code

---

## Next Step

If you want, I can also add:

- Screenshots section  
- Deployment guide  
- API documentation (Swagger)

Reply: **Add deployment + screenshots**






