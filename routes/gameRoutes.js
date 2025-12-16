const express = require('express');
const router = express.Router();
const gameModel = require('../models/game');

/**
 * CREATE a new game for a user
 * POST /games
 */
router.post('/', (req, res) => {
  const { name, user_id } = req.body;

  if (!name || !user_id) {
    return res.status(400).json({ message: 'Game name and user_id required' });
  }

  gameModel.createGame(name, user_id, (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      message: 'Game created',
      game_id: result.insertId
    });
  });
});

/**
 * READ all games (admin / testing)
 * GET /games
 */
router.get('/', (req, res) => {
  gameModel.getAllGames((err, games) => {
    if (err) return res.status(500).json(err);
    res.json(games);
  });
});

/**
 * READ all games created by a specific user
 * GET /games/user/:userId
 */
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;

  gameModel.getGamesByUser(userId, (err, games) => {
    if (err) return res.status(500).json(err);
    res.json(games);
  });
});

/**
 * READ single game by ID
 * GET /games/:id
 */
router.get('/:id', (req, res) => {
  gameModel.getGameById(req.params.id, (err, game) => {
    if (err) return res.status(500).json(err);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  });
});

/**
 * UPDATE game by ID
 * PUT /games/:id
 */
router.put('/:id', (req, res) => {
  gameModel.updateGame(req.params.id, req.body.name, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Game updated' });
  });
});

/**
 * DELETE game by ID
 * DELETE /games/:id
 */
router.delete('/:id', (req, res) => {
  gameModel.deleteGame(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Game deleted' });
  });
});

module.exports = router;
