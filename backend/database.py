from pymongo import MongoClient

client = MongoClient(
    "mongodb://localhost:27017"
)

db = client["netsentinel"]

alerts = db["alerts"]

print("MongoDB Connected Successfully")
