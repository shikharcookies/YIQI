const express = require('express');
const Sentiment = require('sentiment');
const router = express.Router();

const sentiment = new Sentiment();

// Route to analyze sentiment
router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for sentiment analysis' });
  }

  const result = sentiment.analyze(text);
  res.json({
    score: result.score,
    comparative: result.comparative,
    words: result.words,
  });
});

module.exports = router;
