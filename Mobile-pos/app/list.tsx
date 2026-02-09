import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { db } from "../db/sqlite";
import { styles } from "../styles/styles";

export default function ListScreen() {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

  // 🔹 load data from SQLite
  const loadData = async () => {
    try {
      const rows = await db.getAllAsync(
        "SELECT * FROM offline ORDER BY id DESC"
      );
      setData(rows);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  // 🔹 reload every time screen opens
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      
      {/* Back button */}
      <Button title="⬅ Back" onPress={() => router.back()} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>User: {item.user_name}</Text>
            <Text>Plan: {item.plan_name}</Text>
            <Text>Amount: ₹{item.plan_amt}</Text>

            {/* Status indicator */}
            <Text style={styles.statusText}>
              {item.is_synced ? "🟢 Synced" : "🟠 Offline"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
