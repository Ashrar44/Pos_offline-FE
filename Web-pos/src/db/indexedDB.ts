import { openDB } from "idb";

const DB_NAME = "pos-db";
const STORE_NAME = "offline-bills";

// open or create DB
export const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// save bill offline
export const saveOfflineBill = async (bill: any) => {
  const db = await getDB();
  await db.add(STORE_NAME, bill);
};

// get all bills
export const getAllBills = async () => {
  const db = await getDB();
  return db.getAll(STORE_NAME);
};

// get unsynced bills
export const getUnsyncedBills = async () => {
  const db = await getDB();
  const all = await db.getAll(STORE_NAME);
  return all.filter((b: any) => b.is_synced === 0);
};

// mark bills as synced
export const markBillsSynced = async () => {
  const db = await getDB();
  const all = await db.getAll(STORE_NAME);

  for (const bill of all) {
    if (bill.is_synced === 0) {
      bill.is_synced = 1;
      await db.put(STORE_NAME, bill);
    }
  }
};
