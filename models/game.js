const connection = require('./user'); // reuse your existing MySQL connection

// ------------------- Table Creation -------------------
const createGamesTable = `
CREATE TABLE IF NOT EXISTS games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
)
`;

connection.query(createGamesTable, (err) => {
  if (err) throw err;
  console.log('Games table ready');
});

// ------------------- CRUD Functions -------------------

// CREATE: add a new game
function createGame(name, callback) {
  const sql = 'INSERT INTO games (name) VALUES (?)';
  connection.query(sql, [name], (err, results) => callback(err, results));
}

// READ: get all games
function getAllGames(callback) {
  const sql = 'SELECT * FROM games';
  connection.query(sql, (err, results) => callback(err, results));
}

// READ: get a game by ID
function getGameById(gameId, callback) {
  const sql = 'SELECT * FROM games WHERE game_id = ?';
  connection.query(sql, [gameId], (err, results) => callback(err, results[0]));
}

// UPDATE: update a game by ID
function updateGame(gameId, name, callback) {
  const sql = 'UPDATE games SET name = ? WHERE game_id = ?';
  connection.query(sql, [name, gameId], (err, results) => callback(err, results));
}

// DELETE: remove a game by ID
function deleteGame(gameId, callback) {
  const sql = 'DELETE FROM games WHERE game_id = ?';
  connection.query(sql, [gameId], (err, results) => callback(err, results));
}

// Export CRUD functions
module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
};
