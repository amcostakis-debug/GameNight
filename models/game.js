const connection = require('./user'); // reuse existing MySQL connection

// ------------------- TABLE CREATION -------------------
const createGamesTable = `
CREATE TABLE IF NOT EXISTS games (
  game_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)
`;

connection.query(createGamesTable, err => {
  if (err) throw err;
  console.log('Games table ready');
});

// ------------------- CRUD FUNCTIONS -------------------

// CREATE game for a user
function createGame(name, userId, callback) {
  const sql = 'INSERT INTO games (name, user_id) VALUES (?, ?)';
  connection.query(sql, [name, userId], callback);
}

// READ all games
function getAllGames(callback) {
  const sql = 'SELECT * FROM games';
  connection.query(sql, callback);
}

// READ all games for a specific user
function getGamesByUser(userId, callback) {
  const sql = 'SELECT * FROM games WHERE user_id = ?';
  connection.query(sql, [userId], callback);
}

// READ game by ID
function getGameById(gameId, callback) {
  const sql = 'SELECT * FROM games WHERE game_id = ?';
  connection.query(sql, [gameId], (err, results) => {
    callback(err, results[0]);
  });
}

// UPDATE game
function updateGame(gameId, name, callback) {
  const sql = 'UPDATE games SET name = ? WHERE game_id = ?';
  connection.query(sql, [name, gameId], callback);
}

// DELETE game
function deleteGame(gameId, callback) {
  const sql = 'DELETE FROM games WHERE game_id = ?';
  connection.query(sql, [gameId], callback);
}

module.exports = {
  createGame,
  getAllGames,
  getGamesByUser,
  getGameById,
  updateGame,
  deleteGame
};
