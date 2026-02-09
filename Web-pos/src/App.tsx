import { useState } from "react";
import { useAutoSync } from "./hooks/useAutoSync";
import Home from "./pages/Home";
import List from "./pages/List";

function App() {
  useAutoSync();

  const [page, setPage] = useState<"home" | "list">("home");

  return (
    <div>
      <div style={{ padding: 10 }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("list")} style={{ marginLeft: 10 }}>
          List
        </button>
      </div>

      {page === "home" ? <Home /> : <List />}
    </div>
  );
}
export default App;
