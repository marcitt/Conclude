import { useState } from "react";
import axios from "axios";
import PaymentTable from "../components/PaymentTable";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [error, setError] = useState(null);

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
        headers: { "Content-Type": "multipart/form-data" },
      });

      const raw = response.data.result;
      const clean = raw.replace(/'/g, '"'); // replace single with double quotes
      const parsed = JSON.parse(clean);

      console.log("Parsed subscriptions:", parsed);
      setSubscriptions(parsed);
      console.log("Current subscriptions state:", subscriptions);

      
    } catch (err) {
      console.error(err);
      setError("Failed to upload PDF or parse subscriptions");
      setSubscriptions(null);
    }
  };

  return (
    <div>
      <h1>Upload a PDF Form</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}



      {/* Render table only if subscriptions exist */}
      {subscriptions && subscriptions.length > 0 && (
        <PaymentTable subscriptions={subscriptions} />
      )}
    </div>
  );
}
