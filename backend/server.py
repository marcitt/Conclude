from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from bank_scanning import account_scan

app = Flask(__name__)
CORS(app, origins="*")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/members", methods=["GET"])
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"status": "error", "message": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"status": "error", "message": "No selected file"}), 400

    # Save file
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    

    # Your custom PDF processing logic here
    # Example (mocked response):
    processed_data = str(account_scan(filepath))

    return jsonify({"status": "success", "result": processed_data})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
