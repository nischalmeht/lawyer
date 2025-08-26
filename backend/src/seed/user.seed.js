
const connection = require("../db/db.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
require('dotenv').config();
const seedUsers =[
  {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "role": "lawyer",
    "password": "password123"
  },
  {
    "id": 2,
    "name": "Meera Kapoor",
    "email": "meera.kapoor@example.com",
    "role": "client",
    "password": "password123"
  },
  {
    "id": 3,
    "name": "Rohan Mehta",
    "email": "rohan.mehta@example.com",
    "role": "lawyer",
    "password": "password123"
  },
  {
    "id": 4,
    "name": "Ishita Verma",
    "email": "ishita.verma@example.com",
    "role": "client",
    "password": "password123"
  },
  {
    "id": 5,
    "name": "Kabir Singh",
    "email": "kabir.singh@example.com",
    "role": "lawyer",
    "password": "password123"
  }
]



const seedDatabase = async () => {
  try {
    await connection();

    for (let i = 0; i < seedUsers.length; i++) {
      const salt = await bcrypt.genSalt(10);
      seedUsers[i].password = await bcrypt.hash(seedUsers[i].password, salt);
    }
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();