const express = require('express');
const { PythonShell } = require('python-shell');
const router = express.Router();

// Route to make predictions
router.post('/', (req, res) => {
  const { features } = req.body; // Expecting features from the request

  PythonShell.run('path/to/your/predict_script.py', { args: [JSON.stringify(features)] }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Prediction failed' });
    }

    res.json({ prediction: results[0] }); // Assuming the prediction is returned as the first result
  });
});

module.exports = router;
