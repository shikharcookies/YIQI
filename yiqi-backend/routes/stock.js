const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to get stock data
router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
    
    // Extract necessary data from the response
    const stockData = response.data.chart.result[0];
    
    const result = {
      symbol: symbol.toUpperCase(),
      currentPrice: stockData.meta.regularMarketPrice,
      currency: stockData.meta.currency,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data' });
  }
});

module.exports = router;
