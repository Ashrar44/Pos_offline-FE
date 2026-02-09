import * as SQLite from "expo-sqlite";

// open (or create) local database
export const db = SQLite.openDatabaseSync("offline.db");

// create table
export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS offline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT,
      plan_name TEXT,
      plan_amt INTEGER,
      created_at TEXT,
      is_synced INTEGER DEFAULT 0
    );
  `);
};
