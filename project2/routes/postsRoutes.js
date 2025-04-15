const express = require('express');
const router = express.Router();
const { getPopularPosts, getLatestPosts } = require('../services/analyticsService');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    if (type === 'popular') {
      const posts = await getPopularPosts();
      res.json(posts);
    } else if (type === 'latest') {
      const posts = await getLatestPosts();
      res.json(posts);
    } else {
      res.status(400).send("Invalid 'type' query param. Use 'latest' or 'popular'.");
    }
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

module.exports = router;
