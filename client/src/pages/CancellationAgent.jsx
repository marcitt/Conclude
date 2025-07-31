import React from "react";
import { useLocation } from "react-router-dom";

const CancellationAgent = () => {
  const location = useLocation();
//   const selectedAccounts = location.state?.accounts || [];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>Cancellation Agent</h2>
      <p>We’re now working on cancelling the following subscriptions:</p>

      {/* <ul>
        {selectedAccounts.map((account, idx) => (
          <li key={idx}>{account}</li>
        ))}
      </ul> */}

      {/* Placeholder for chatbot or messaging UI */}
      <div
        style={{
          marginTop: "2rem",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          padding: "1rem",
          backgroundColor: "#f9f9ff",
        }}
      >
        <p><strong>Agent:</strong> Hi! I’m starting the cancellation process. Please hold on…</p>
      </div>
    </div>
  );
};

export default CancellationAgent;
