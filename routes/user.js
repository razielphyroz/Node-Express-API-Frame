const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  const user = new User(
    {
      name: req.body.name,
      email: req.body.email
    }
  );

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch(e) {
    res.status(400).json({ message: e.error });
  }
});

// List all users
router.get('/', async (req, res) => {
  
  try {
    const users = await User.find();
    res.json({ users });
  } catch(e) {
    res.status(500).json({ message: e.error });
  }
});

// Middleware function to get the user
async function getUser(req, res, next) {
  try {
    const user = User.findById(router.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found'});
    } 
  } catch(e) {
    return res.status(500).status({ message: e.message });
  }

  res.user = user;
  next();
}

module.exports = router;