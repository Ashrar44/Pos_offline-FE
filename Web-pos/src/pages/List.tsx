import { useEffect, useState } from "react";
import { getAllBills } from "../db/indexedDB";

export default function List() {
  const [bills, setBills] = useState<any[]>([]);

  const loadBills = async () => {
    const data = await getAllBills();
    setBills(data.reverse()); // latest first
  };

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Saved Bills</h1>

      {bills.length === 0 && <p>No bills found</p>}

      {bills.map((bill) => (
        <div
          key={bill.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <p><b>User:</b> {bill.user_name}</p>
          <p><b>Plan:</b> {bill.plan_name}</p>
          <p><b>Amount:</b> ₹{bill.plan_amt}</p>

          <p>
            <b>Status:</b>{" "}
            {bill.is_synced ? "🟢 Synced" : "🟠 Offline"}
          </p>
        </div>
      ))}
    </div>
  );
}
