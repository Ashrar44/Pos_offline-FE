import { useEffect } from "react";
import { syncBills } from "../api/api";
import { getUnsyncedBills, markBillsSynced } from "../db/indexedDB";

export const useAutoSync = () => {
  const syncNow = async () => {
    try {
      const bills = await getUnsyncedBills();

      if (bills.length === 0) return;

      console.log("🚀 Syncing bills:", bills.length);

      await syncBills(bills);

      await markBillsSynced();

      console.log("✅ Sync success");
    } catch (err) {
      console.log("❌ Sync error:", err);
    }
  };

  useEffect(() => {
    // run once on load
    syncNow();

    // run when internet comes back
    const handleOnline = () => syncNow();

    window.addEventListener("online", handleOnline);

    return () => window.removeEventListener("online", handleOnline);
  }, []);
};
