import yahoo_fin.stock_info as si
import xgboost as xgb
import joblib
import pandas as pd

# Define a function to fetch data and train the model
def train_model(stock_symbol):
    # Fetch historical data
    df = si.get_data(stock_symbol)
    df['returns'] = df['close'].pct_change()  # Calculate returns

    # Create features (you can customize this)
    df['previous_close'] = df['close'].shift(1)
    df['volume'] = df['volume']
    df['sentiment_score'] = 0.0  # Placeholder for sentiment score

    # Remove any rows with NaN values
    df.dropna(inplace=True)

    # Define features and target
    X = df[['previous_close', 'volume', 'sentiment_score']]
    y = df['returns'].shift(-1).dropna()  # Shift to predict next day's return
    X = X[:-1]  # Align X with y

    # Train the XGBoost model
    model = xgb.XGBRegressor()
    model.fit(X, y)

    # Save the trained model
    joblib.dump(model, 'xgboost_model.pkl')

# Example usage
train_model('AAPL')  # Replace with desired stock symbol
