import React, { useState } from 'react';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (symbol) {
      try {
        // Fetch stock data from Yahoo Finance
        const response = await fetch(`http://localhost:5000/api/financial/${symbol}`);
        const stockData = await response.json();

        // Fetch sentiment analysis
        const sentimentResponse = await fetch(`http://localhost:5000/api/sentiment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: "Apple is doing great this quarter!", // Replace with actual news data in the future
          }),
        });
        const sentimentData = await sentimentResponse.json();

        // Prepare features for prediction
        const features = [
          stockData.currentPrice,  // Current stock price
          sentimentData.score,      // Sentiment score
          // Add any additional features if necessary
        ];

        // Fetch prediction
        const predictionResponse = await fetch(`http://localhost:5000/api/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ features }),
        });
        const predictionData = await predictionResponse.json();

        setPrediction(`Predicted stock price for ${stockData.symbol}: $${predictionData.prediction}`);
      } catch (error) {
        setPrediction('Error fetching stock data, sentiment analysis, or prediction.');
      }
    } else {
      setPrediction('Please enter a valid stock symbol!');
    }
  };

  return (
    <div>
      <h1>Yiqi - Sentiment-Based Stock Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Stock Symbol" 
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value)} 
          required 
        />
        <button type="submit">Predict</button>
      </form>
      <div>
        <h2>Prediction:</h2>
        <p>{prediction}</p>
      </div>
    </div>
  );
};

export default App;
