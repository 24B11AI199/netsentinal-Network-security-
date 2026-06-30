import joblib
import pandas as pd

model = joblib.load("../models/isolation_forest.pkl")

def detect_anomalies(df):

    features = df[[
        "packet_size",
        "duration",
        "source_port",
        "destination_port"
    ]]

    predictions = model.predict(features)

    df["prediction"] = predictions

    return df