import React from "react";

const PaymentTable = ({ subscriptions }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Subscription Payments</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Account</th>
            <th className="border px-4 py-2 text-left">Payment Type (Monthly/Yearly)</th>
            <th className="border px-4 py-2 text-left">Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{row.account}</td>
              <td className="border px-4 py-2">{row.type}</td>
              <td className="border px-4 py-2">{row.lastPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
