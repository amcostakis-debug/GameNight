const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// CREATE a new user
router.post('/', (req, res) => {
  userModel.createUser(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User created', id: result.insertId });
  });
});

// READ all users
router.get('/', (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err });
    res.json(users);
  });
});

// READ single user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  userModel.getUserById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  });
});

// UPDATE user by ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  userModel.updateUser(userId, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated' });
  });
});

// DELETE user by ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  userModel.deleteUser(userId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
