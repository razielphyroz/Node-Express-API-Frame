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


module.exports = router;