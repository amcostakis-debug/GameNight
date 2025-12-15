const express = require('express');
const router = express.Router();
const gameModel = require('../models/game');

// CREATE a new game
router.post('/', (req, res) => {
  gameModel.createGame(req.body.name, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Game created', id: result.insertId });
  });
});

// READ all games
router.get('/', (req, res) => {
  gameModel.getAllGames((err, games) => {
    if (err) return res.status(500).json({ error: err });
    res.json(games);
  });
});

// READ single game by ID
router.get('/:id', (req, res) => {
  const gameId = req.params.id;
  gameModel.getGameById(gameId, (err, game) => {
    if (err) return res.status(500).json({ error: err });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  });
});

// UPDATE game by ID
router.put('/:id', (req, res) => {
  const gameId = req.params.id;
  gameModel.updateGame(gameId, req.body.name, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Game updated' });
  });
});

// DELETE game by ID
router.delete('/:id', (req, res) => {
  const gameId = req.params.id;
  gameModel.deleteGame(gameId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Game deleted' });
  });
});

module.exports = router;
