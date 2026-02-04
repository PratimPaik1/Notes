# 📝 Notes App

A full-stack Notes CRUD application built with **React, Express, MongoDB, and Tailwind CSS**.  
Users can create, edit, delete, and view notes with a clean UI and smooth UX.

🔗 **Live Link:** https://notes-4x8s.onrender.com/  
🔗 **Repository:** https://github.com/PratimPaik1/Notes

---

## 🚀 Features
- Create, Read, Update, Delete (CRUD) notes
- Edit notes using PATCH request
- Controlled React forms
- Skeleton loading UI
- Responsive design

---

## 🛠 Tech Stack
**Frontend:** React, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, MongoDB (Mongoose)  
**Deployment:** Render

---

## 🔄 API Endpoints
- `GET /api/notes` → Fetch all notes  
- `POST /api/notes` → Create a note  
- `PATCH /api/notes/:id` → Update a note  
- `DELETE /api/notes/:id` → Delete a note  

---

## ⚙️ Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/PratimPaik1/Notes.git
cd Notes
2️⃣ Install dependencies
npm install

3️⃣ Environment variables

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
PORT=3000

4️⃣ Start the server
npm start
