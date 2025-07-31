import React, { useState } from "react";

const PaymentTable = ({subscriptions}) => {
  return (
    <div>
      <h2>Subscription Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Payment Type</th>
            <th>Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((row, idx) => (
            <tr key={idx}>
              <td>{row.account}</td>
              <td>{row.type}</td>
              <td>{row.lastPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;

