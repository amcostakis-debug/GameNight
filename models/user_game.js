const connection = require('./user'); // reuse your existing connection

// ------------------- Table Creation -------------------
const createUserGameTable = `
CREATE TABLE IF NOT EXISTS user_game (
    user_id INT,
    game_id INT,
    PRIMARY KEY(user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
)
`;

connection.query(createUserGameTable, (err) => {
  if (err) throw err;
  console.log('User_Game table ready');
});

// ------------------- CRUD Functions -------------------

// CREATE: link a user to a game
function addUserGame(userId, gameId, callback) {
  const sql = 'INSERT INTO user_game (user_id, game_id) VALUES (?, ?)';
  connection.query(sql, [userId, gameId], (err, results) => callback(err, results));
}

// READ: get all games for a specific user
function getGamesByUser(userId, callback) {
  const sql = `
    SELECT g.* 
    FROM games g
    JOIN user_game ug ON g.game_id = ug.game_id
    WHERE ug.user_id = ?
  `;
  connection.query(sql, [userId], (err, results) => callback(err, results));
}

// READ: get all users for a specific game
function getUsersByGame(gameId, callback) {
  const sql = `
    SELECT u.* 
    FROM users u
    JOIN user_game ug ON u.user_id = ug.user_id
    WHERE ug.game_id = ?
  `;
  connection.query(sql, [gameId], (err, results) => callback(err, results));
}

// DELETE: remove a link between a user and a game
function removeUserGame(userId, gameId, callback) {
  const sql = 'DELETE FROM user_game WHERE user_id = ? AND game_id = ?';
  connection.query(sql, [userId, gameId], (err, results) => callback(err, results));
}

// Export CRUD functions
module.exports = {
  addUserGame,
  getGamesByUser,
  getUsersByGame,
  removeUserGame
};
