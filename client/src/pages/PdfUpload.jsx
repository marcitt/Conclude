import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import PaymentTable from "../components/PaymentTable";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

// const navigate = useNavigate();

const handleCancellations = async (selectedAccounts) => {
  console.log("Sending to cancellation agent:", selectedAccounts);
  // navigate("/cancel-agent", { state: { accounts: selectedAccounts } });
  //   try {
  //     // const response = await client.post("/cancel-subscriptions", {
  //     //   accounts: selectedAccounts,
  //     // });
  //     alert("Cancellation request submitted successfully!");
  //     navigate("/cancel-agent", { state: { accounts: selectedAccounts } });
  //   } catch (error) {
  //     console.error("Cancellation error:", error);
  //     alert("Failed to submit cancellation request.");
  //   }
  // };
};

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);         // Start loading
    setError(null);           // Clear any previous errors
    setSubscriptions(null);   // Clear old subscriptions

    try {
      const response = await client.post("/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const raw = response.data.result;
      const clean = raw.replace(/'/g, '"'); // replace single with double quotes
      const parsed = JSON.parse(clean);

      console.log("Parsed subscriptions:", parsed);
      setSubscriptions(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to upload PDF or parse subscriptions");
      setSubscriptions(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: 100 }}>
      <h1 style={{textAlign:"center", marginTop:100}}>Identify Accounts</h1>
      <p>To Begin Cancelling Accounts Upload Recent Bank Statement</p>
      <form onSubmit={handleUpload}>
        <label class="custom-file-upload">select file<input type="file" accept="application/pdf" onChange={handleFileChange} /></label>

        <button type="submit">Upload</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}



      {subscriptions && subscriptions.length > 0 && (
        <PaymentTable subscriptions={subscriptions} onSubmit={handleCancellations} />
      )}
    </div>
  );
}
