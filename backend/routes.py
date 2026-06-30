from fastapi import APIRouter, UploadFile, File
import pandas as pd
import joblib
from database import alerts

router = APIRouter()

# Load trained Isolation Forest model
model = joblib.load("../models/isolation_forest.pkl")


@router.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    # Read uploaded CSV
    df = pd.read_csv(file.file)

    # Select features for prediction
    X = df[
        [
            "packet_size",
            "duration",
            "source_port",
            "destination_port"
        ]
    ]

    # Predict anomalies
    predictions = model.predict(X)

    # Add predictions to dataframe
    df["prediction"] = predictions

    # Threat rows (-1 means anomaly)
    threat_rows = df[df["prediction"] == -1]

    # Save threats to MongoDB
    for _, row in threat_rows.iterrows():

        alerts.insert_one({

            "source_ip": str(row["source_ip"]),

            "destination_ip": str(row["destination_ip"]),

            "packet_size": int(row["packet_size"]),

            "status": "Threat"

        })

    # Dashboard Statistics
    total_records = len(df)

    threats = len(threat_rows)

    safe_records = total_records - threats

    percentage = round((threats / total_records) * 100, 2)

    # Risk Level
    if threats == 0:
        risk = "SAFE"

    elif threats <= 2:
        risk = "MEDIUM"

    else:
        risk = "HIGH"

    # Return data to frontend
    return {

        "total_records": total_records,

        "safe_records": safe_records,

        "threats": threats,

        "risk": risk,

        "percentage": percentage,

        "status": "Analysis Complete"

    }