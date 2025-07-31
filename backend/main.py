from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from bank_scanning import account_scan

import json

import os
import shutil

app = FastAPI()

# Allow all CORS (just like Flask-CORS with origins="*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Request model for POST /api/cancel_subscriptions
class CancelRequest(BaseModel):
    accounts: list[str]

# Route: POST /api/cancel_subscriptions
@app.post("/api/cancel_subscriptions")
def cancel_subscriptions(data: CancelRequest):
    print("Accounts to cancel:", data.accounts)
    return {"status": "success", "cancelled": data.accounts}

# Route: POST /upload-pdf
@app.post("/upload-pdf")
def upload_pdf(file: UploadFile = File(...)):
    if not file.filename:
        return {"status": "error", "message": "No selected file"}

    # Save the uploaded file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(filepath, "wb") as f:
        shutil.copyfileobj(file.file, f)

    processed_data = account_scan(filepath)

    return {"status": "success", "result": processed_data}
