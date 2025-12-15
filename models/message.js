const connection = require('./user'); // reuse the existing MySQL connection

// ------------------- Table Creation -------------------
const createMessagesTable = `
CREATE TABLE IF NOT EXISTS messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
)
`;

connection.query(createMessagesTable, (err) => {
  if (err) throw err;
  console.log('Messages table ready');
});

// ------------------- CRUD Functions -------------------

// CREATE: add a new message
function createMessage(chatId, senderId, content, callback) {
  const sql = 'INSERT INTO messages (chat_id, sender_id, content) VALUES (?, ?, ?)';
  connection.query(sql, [chatId, senderId, content], (err, results) => callback(err, results));
}

// READ: get all messages in a chat
function getMessagesByChat(chatId, callback) {
  const sql = 'SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC';
  connection.query(sql, [chatId], (err, results) => callback(err, results));
}

// READ: get a single message by ID
function getMessageById(messageId, callback) {
  const sql = 'SELECT * FROM messages WHERE message_id = ?';
  connection.query(sql, [messageId], (err, results) => callback(err, results[0]));
}

// UPDATE: update a message by ID
function updateMessage(messageId, newContent, callback) {
  const sql = 'UPDATE messages SET content = ? WHERE message_id = ?';
  connection.query(sql, [newContent, messageId], (err, results) => callback(err, results));
}

// DELETE: delete a message by ID
function deleteMessage(messageId, callback) {
  const sql = 'DELETE FROM messages WHERE message_id = ?';
  connection.query(sql, [messageId], (err, results) => callback(err, results));
}

// Export CRUD functions
module.exports = {
  createMessage,
  getMessagesByChat,
  getMessageById,
  updateMessage,
  deleteMessage
};
