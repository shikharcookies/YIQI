import sys
import joblib
import numpy as np

# Load the trained model
model = joblib.load('xgboost_model.pkl')

# Get input features from the arguments
input_data = sys.argv[1]
features = np.array(eval(input_data)).reshape(1, -1)  # Convert input to a 2D array

# Make prediction
prediction = model.predict(features)

# Print prediction to output
print(prediction[0])
