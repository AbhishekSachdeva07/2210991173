const express = require('express');
const router = express.Router();
const { getTopUsersByComments } = require('../services/analyticsService');

router.get('/', async (req, res) => {
  try {
    const users = await getTopUsersByComments();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching top users');
  }
});

module.exports = router;
