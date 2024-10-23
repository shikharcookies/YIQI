const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const router = express.Router();

// Route to get stock data
router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    const result = await yahooFinance.quote(symbol);
    // Extract necessary data
    const stockData = {
      symbol: result.symbol,
      currentPrice: result.regularMarketPrice,
      currency: result.currency,
      // Add more data if necessary
    };

    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data from Yahoo Finance' });
  }
});

module.exports = router;
