const connection = require('./user'); // reuse the existing MySQL connection

// ------------------- Table Creation -------------------
const createMatchesTable = `
CREATE TABLE IF NOT EXISTS matches (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    FOREIGN KEY (user1_id) REFERENCES users(user_id),
    FOREIGN KEY (user2_id) REFERENCES users(user_id)
)
`;

connection.query(createMatchesTable, (err) => {
  if (err) throw err;
  console.log('Matches table ready');
});

// ------------------- CRUD Functions -------------------

// CREATE: add a new match
function createMatch(user1Id, user2Id, callback) {
  const sql = 'INSERT INTO matches (user1_id, user2_id) VALUES (?, ?)';
  connection.query(sql, [user1Id, user2Id], (err, results) => callback(err, results));
}

// READ: get all matches
function getAllMatches(callback) {
  const sql = 'SELECT * FROM matches';
  connection.query(sql, (err, results) => callback(err, results));
}

// READ: get a match by ID
function getMatchById(matchId, callback) {
  const sql = 'SELECT * FROM matches WHERE match_id = ?';
  connection.query(sql, [matchId], (err, results) => callback(err, results[0]));
}

// UPDATE: update the users in a match
function updateMatch(matchId, user1Id, user2Id, callback) {
  const sql = 'UPDATE matches SET user1_id = ?, user2_id = ? WHERE match_id = ?';
  connection.query(sql, [user1Id, user2Id, matchId], (err, results) => callback(err, results));
}

// DELETE: remove a match by ID
function deleteMatch(matchId, callback) {
  const sql = 'DELETE FROM matches WHERE match_id = ?';
  connection.query(sql, [matchId], (err, results) => callback(err, results));
}

// Export CRUD functions
module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
};
