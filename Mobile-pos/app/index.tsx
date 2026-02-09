import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { db, initDB } from "../db/sqlite";
import { useAutoSync } from "../hooks/useAutoSync";
import { styles } from "../styles/styles";


export default function Home() {
  const router = useRouter();
  const { startAutoSync, syncNow } = useAutoSync();

  const [userName, setUserName] = useState("");
  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    initDB();
    startAutoSync();
  }, []);

  const clearLocalDB = async () => {
  try {
    await db.runAsync("DELETE FROM offline");
    alert("Local SQLite cleared");
  } catch (err) {
    console.log("Clear error:", err);
  }
};

  const saveOffline = async () => {
    if (!userName || !planName || !amount) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      await db.runAsync(
        `INSERT INTO offline 
         (user_name, plan_name, plan_amt, created_at, is_synced)
         VALUES (?, ?, ?, datetime('now'), 0)`,
        [userName, planName, Number(amount)]
      );
      await syncNow();   // ⭐ immediate sync if internet already ON

      alert("Saved locally (offline)");

      setUserName("");
      setPlanName("");
      setAmount("");
    } catch (err) {
      console.log("SQLite error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline Billing App</Text>

      <TextInput
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      <TextInput
        placeholder="Plan Name"
        value={planName}
        onChangeText={setPlanName}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Save" onPress={saveOffline} />
      <View style={styles.buttonGap} />
      <Button title="View Saved Data" onPress={() => router.push("/list")} />
      <View style={styles.buttonGap} />
      <Button title="Clear Local Data" onPress={clearLocalDB} />

    </View>
  );
}
