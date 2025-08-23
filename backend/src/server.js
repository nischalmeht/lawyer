const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// Load environment variables from .env
dotenv.config();

const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const { server,app } = require('./socket/socket');


// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});