import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

# Load Dataset
df = pd.read_csv("../DataSet/network_data.csv")

print("Dataset Loaded Successfully")

# Features for AI Model
X = df[
    [
        "packet_size",
        "duration",
        "source_port",
        "destination_port"
    ]
]

# Train Isolation Forest
model = IsolationForest(
    contamination=0.1,
    random_state=42
)

model.fit(X)

print("Model Training Completed")

# Save Model
joblib.dump(
    model,
    "../Models/isolation_forest.pkl"
)

print("Model Saved Successfully")