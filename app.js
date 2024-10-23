// app.js

document.getElementById('stock-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form from submitting normally
    
    const stockSymbol = document.getElementById('stock-symbol').value.toUpperCase();
    const resultOutput = document.getElementById('prediction-output');

    // Simulating a stock prediction output
    if (stockSymbol) {
        resultOutput.textContent = `Predicted stock price for ${stockSymbol}: $150.23 (This is a placeholder)`;
    } else {
        resultOutput.textContent = 'Please enter a valid stock symbol!';
    }
});
