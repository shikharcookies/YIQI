const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

console.log('Initializing server...'); // Add this to check if server reaches this point

// Test route
app.get('/', (req, res) => {
  res.send('Yiqi Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const stockRoutes = require('./routes/stock');
app.use('/api/stocks', stockRoutes);

const sentimentRoutes = require('./routes/sentiment');
app.use('/api/sentiment', sentimentRoutes);

const financialDataRoutes = require('./routes/financialData');
app.use('/api/financial', financialDataRoutes);

const predictRoutes = require('./routes/predict');
app.use('/api/predict', predictRoutes);

