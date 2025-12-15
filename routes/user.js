const express = require("express")
const User = require("../models/user")
const router = express.Router()

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST login
router.post("/login", async (req, res) => {
  try {
    const user = await User.login(req.body)
    // remove password before sending
    res.json({
      UserID: user.UserID,
      Username: user.Username,
      Email: user.Email
    })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
})

// POST register
router.post("/register", async (req, res) => {
  try {
    const user = await User.register(req.body)
    // remove password before sending
    res.json({
      UserID: user.UserID,
      Username: user.Username,
      Email: user.Email
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
