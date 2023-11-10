import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Leaderboard from "./components/Leaderboard";
import Form from "./components/Form";
import "./assets/fonts/digital-7.ttf";
import "./App.css";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <Leaderboard />
        <Form />
      </QueryClientProvider>
    </div>
  );
}

export default App;
