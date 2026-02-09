const BASE_URL = "http://192.168.1.16:8080"; // change if needed

export const syncBills = async (bills: any[]) => {
  const res = await fetch(`${BASE_URL}/offline/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bills),
  });

  if (!res.ok) {
    throw new Error("Sync failed: " + res.status);
  }

  return res.json();
};
