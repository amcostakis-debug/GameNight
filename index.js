require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ------------------- MySQL Connection -------------------
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// ------------------- Initialize Tables -------------------
require('./models/user');      // users table
require('./models/game');      // games table
require('./models/user_game'); // user_game table
require('./models/match');     // matches table
require('./models/chat');      // chats table
require('./models/message');   // messages table

// ------------------- Import CRUD Functions -------------------
const userModel = require('./models/user');
const gameModel = require('./models/game');
const userGameModel = require('./models/user_game');
const matchModel = require('./models/match');
const chatModel = require('./models/chat');
const messageModel = require('./models/message');

// ------------------- Example CRUD Operations -------------------
// (Your current CRUD example code remains unchanged here)
userModel.createUser({
  username: 'Ang',
  email: 'ang@example.com',
  password: 'password123',
  date_of_birth: '2000-01-01',
  gender: 'Female',
  city: 'New York',
  country: 'USA',
  bio: 'I love gaming!'
}, (err, result) => {
  if (err) return console.error(err);
  console.log('User created with ID:', result.insertId);

  // ... rest of your nested CRUD example code ...
});

// ------------------- Express Middleware -------------------
app.use(express.json()); // parse JSON for POST/PUT requests

// ------------------- Routes -------------------
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

// ------------------- Start Express Server -------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
