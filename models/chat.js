const connection = require('./user'); // reuse the existing MySQL connection

// ------------------- Table Creation -------------------
const createChatsTable = `
CREATE TABLE IF NOT EXISTS chats (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL,
    FOREIGN KEY (match_id) REFERENCES matches(match_id)
)
`;

connection.query(createChatsTable, (err) => {
  if (err) throw err;
  console.log('Chats table ready');
});

// ------------------- CRUD Functions -------------------

// CREATE: add a new chat
function createChat(matchId, callback) {
  const sql = 'INSERT INTO chats (match_id) VALUES (?)';
  connection.query(sql, [matchId], (err, results) => callback(err, results));
}

// READ: get all chats
function getAllChats(callback) {
  const sql = 'SELECT * FROM chats';
  connection.query(sql, (err, results) => callback(err, results));
}

// READ: get a chat by ID
function getChatById(chatId, callback) {
  const sql = 'SELECT * FROM chats WHERE chat_id = ?';
  connection.query(sql, [chatId], (err, results) => callback(err, results[0]));
}

// UPDATE: update the match associated with a chat
function updateChat(chatId, matchId, callback) {
  const sql = 'UPDATE chats SET match_id = ? WHERE chat_id = ?';
  connection.query(sql, [matchId, chatId], (err, results) => callback(err, results));
}

// DELETE: remove a chat by ID
function deleteChat(chatId, callback) {
  const sql = 'DELETE FROM chats WHERE chat_id = ?';
  connection.query(sql, [chatId], (err, results) => callback(err, results));
}

// Export CRUD functions
module.exports = {
  createChat,
  getAllChats,
  getChatById,
  updateChat,
  deleteChat
};
