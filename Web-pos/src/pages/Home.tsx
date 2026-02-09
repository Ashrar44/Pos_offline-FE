import { useState } from "react";
import { saveOfflineBill } from "../db/indexedDB";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = async () => {
    if (!userName || !planName || !amount) {
      alert("Fill all fields");
      return;
    }

    await saveOfflineBill({
      user_name: userName,
      plan_name: planName,
      plan_amt: Number(amount),
      created_at: new Date().toISOString(),
      is_synced: 0,
    });

    alert("Saved offline");

    setUserName("");
    setPlanName("");
    setAmount("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Web POS Billing</h1>

      <input
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Plan Name"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSave}>Save Offline</button>

      <button
  onClick={async () => {
    try {
      await window.electronAPI.printBill();
    } catch (e) {
      alert("Print failed");
    }
  }}
>
  Print Test
</button>

    </div>
  );
}
