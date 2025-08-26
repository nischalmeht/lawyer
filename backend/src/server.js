const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// Load environment variables from .env
dotenv.config();

const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat-routes');
const messageRoutes = require('./routes/message-routes');
const { server,app } = require('./socket/socket');


// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // allow only frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.use('/api/users', userRoutes);

app.use('/api', chatRoutes);
app.use('/api/message', messageRoutes);


const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});