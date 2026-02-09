import NetInfo from "@react-native-community/netinfo";
import { syncOfflineRecords } from "../api/api";
import { db } from "../db/sqlite";

export const useAutoSync = () => {

  // 🔹 manual sync function
  const syncNow = async () => {
    try {
      const rows: any[] = await db.getAllAsync(
        "SELECT * FROM offline WHERE is_synced = 0"
      );

      if (rows.length === 0) return;

      console.log("🚀 Syncing rows:", rows.length);

      await syncOfflineRecords(rows);

      await db.runAsync(
        "UPDATE offline SET is_synced = 1 WHERE is_synced = 0"
      );

      console.log("✅ Sync success");
    } catch (err) {
      console.log("❌ Sync failed:", err);
    }
  };

  // 🔹 auto sync when internet turns ON
  const startAutoSync = () => {
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await syncNow();
      }
    });
  };

  return { startAutoSync, syncNow };
};
