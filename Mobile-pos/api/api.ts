const BASE_URL = "http://192.168.1.16:8080"; 
// ⚠ change to your laptop IP (example: 192.168.1.5)

export const syncOfflineRecords = async (records: any[]) => {
  const res = await fetch(`${BASE_URL}/offline/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(records),
  });
  if (!res.ok) {
    throw new Error("Sync API failed: " + res.status);
  }

  return res.json();
};
