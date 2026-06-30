import pandas as pd
import joblib

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

print(df)