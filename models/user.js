const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// ------------------- Table Creation -------------------
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    city VARCHAR(50),
    country VARCHAR(50),
    bio TEXT,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

connection.query(createUsersTable, (err) => {
  if (err) throw err;
  console.log('Users table ready');
});

// ------------------- CRUD Functions -------------------

// CREATE a new user
function createUser(user, callback) {
  const sql = `
    INSERT INTO users 
    (username, email, password, date_of_birth, gender, city, country, bio) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    user.username, user.email, user.password, user.date_of_birth,
    user.gender, user.city, user.country, user.bio
  ];
  connection.query(sql, params, (err, results) => callback(err, results));
}

// READ all users
function getAllUsers(callback) {
  connection.query('SELECT * FROM users', (err, results) => callback(err, results));
}

// READ a single user by ID
function getUserById(userId, callback) {
  connection.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => callback(err, results[0]));
}

// UPDATE a user by ID
function updateUser(userId, user, callback) {
  const sql = `
    UPDATE users 
    SET username=?, email=?, password=?, date_of_birth=?, gender=?, city=?, country=?, bio=? 
    WHERE user_id=?
  `;
  const params = [
    user.username, user.email, user.password, user.date_of_birth,
    user.gender, user.city, user.country, user.bio, userId
  ];
  connection.query(sql, params, (err, results) => callback(err, results));
}

// DELETE a user by ID
function deleteUser(userId, callback) {
  connection.query('DELETE FROM users WHERE user_id = ?', [userId], (err, results) => callback(err, results));
}

// Export CRUD functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
