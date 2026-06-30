from database import alerts

alerts.insert_one({
    "test": "working"
})

print("Data Inserted")