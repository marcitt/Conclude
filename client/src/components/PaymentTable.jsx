import React, { useState } from "react";

const PaymentTable = ({ subscriptions, onSubmit }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelection = (account) => {
    setSelected((prev) =>
      prev.includes(account)
        ? prev.filter((a) => a !== account)
        : [...prev, account]
    );
  };

  const handleSubmit = () => {
    const selectedAccounts = subscriptions.filter((sub) =>
      selected.includes(sub.account)
    );
    onSubmit(selectedAccounts);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Subscription Payments</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th>Cancel?</th>
            <th>Account</th>
            <th>Payment Type</th>
            <th>Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((row, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(row.account)}
                  onChange={() => toggleSelection(row.account)}
                />
              </td>
              <td>{row.account}</td>
              <td>{row.type}</td>
              <td>{row.lastPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
      >
        Submit Cancellation Requests
      </button>
    </div>
  );
};

export default PaymentTable;
