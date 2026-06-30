import pandas as pd
import joblib

from database import alerts

model = joblib.load(
    "../models/isolation_forest.pkl"
)

df = pd.read_csv(
    "../dataset/network_data.csv"
)

X = df[
    [
        "packet_size",
        "duration",
        "source_port",
        "destination_port"
    ]
]

predictions = model.predict(X)

df["prediction"] = predictions

threats = df[
    df["prediction"] == -1
]

for _, row in threats.iterrows():

    alerts.insert_one({
        "source_ip": row["source_ip"],
        "destination_ip": row["destination_ip"],
        "packet_size": int(row["packet_size"]),
        "status": "Threat"
    })

print("Threats Saved")