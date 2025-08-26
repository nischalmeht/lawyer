Lawyer-Client Chat Application

A real-time lawyer-client communication platform built using Node.js, Express, MongoDB, React.js (Vite), and Socket.IO. The app enables lawyers and clients to communicate securely with features like online user tracking, typing indicators, and unread message tracking.

🚀 Features

Authentication: Secure login and signup for both lawyers and clients.

Real-time Messaging: Send and receive messages instantly using Socket.IO.

Online Users: Displays who is currently online.

Typing Indicator: Shows when the other user is typing.

Unread Messages: Messages are marked as unread until seen by the recipient.

Scalable Backend: Built on Node.js + Express with MongoDB for persistence.

Modern Frontend: Developed with React.js + Vite for fast and optimized performance.

🛠️ Tech Stack

Frontend

React.js (Vite)

TailwindCSS (optional styling)

Axios (API communication)

Socket.IO Client

Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.IO Server

JWT (Authentication)

📂 Project Structure
lawyer-client-chat/
│
├── backend/                 # Express + MongoDB + Socket.IO backend
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Express routes
│   │   ├── controllers/     # Business logic
│   │   ├── socket/          # Socket.IO events
│   │   ├── utils/           # Helpers, middlewares
│   │   └── index.js         # Entry point
│   ├── package.json
│
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── components/      # UI Components (Chat, Sidebar, TypingIndicator, etc.)
│   │   ├── context/         # Socket context, auth context
│   │   ├── pages/           # Login, Signup, Chat page
│   │   ├── services/        # API + Socket services
│   │   └── main.jsx         # React entry
│   ├── package.json
│
├── README.md
└── .gitignore

⚙️ Installation
1. Clone Repository
git clone https://github.com/your-username/lawyer-client-chat.git
cd lawyer-client-chat

2. Setup Backend
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/lawyer-client-chat
JWT_SECRET=your_secret_key


Run backend:

npm run dev

3. Setup Frontend
cd ../frontend
npm install
npm run dev

🔌 Socket.IO Events
Server-Side

connection → user connects

send-message → send a message

receive-message → receive message

typing → user typing status

stop-typing → typing stopped

online-users → list of online users

Client-Side

socket.emit("send-message", {...})

socket.on("receive-message", callback)

socket.emit("typing", userId)

socket.on("online-users", users)

📊 Database Models
User
{
  _id,
  name,
  email,
  password,
  role: "lawyer" | "client",
  createdAt
}

Message
{
  _id,
  sender: ObjectId(User),
  receiver: ObjectId(User),
  content: String,
  isRead: Boolean,
  createdAt
}

🚦 Future Improvements

Group chat support (multiple clients with one lawyer)

File and document sharing (case files, contracts)

Video/voice call integration

Push notifications

🧑‍⚖️ Use Case

This project is tailored for lawyers and clients who want a secure, fast, and real-time communication channel with case-specific chat functionality.
