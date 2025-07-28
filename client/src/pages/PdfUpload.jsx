// src/pages/PdfUpload.jsx
import { useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await client.post("/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Upload error", error);
      setResult("Failed to upload PDF");
    }
  };

  return (
    <div>
      <h1>Upload a PDF Form</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
