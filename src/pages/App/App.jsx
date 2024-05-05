import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import Home from "../HomePage/HomePage";
import Create from "../CreatePage/CreatePage";
import History from "../HistoryPage/HistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import LandingPage from "../LandingPage/LandingPage";
import AuthPage from "../AuthPage/AuthPage";
import Expense from "../../components/Expense/Expense";
import Transfer from "../../components/Transfer/Transfer";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/home" element={<Home />} />
            <Route
              path="/create"
              element={<Create user={user} setUser={setUser} />}
            />
            <Route path="/history" element={<History />} />
            <Route path="/create/expense" element={<Expense />} />
            <Route path="/create/transfer" element={<Transfer />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<AuthPage setUser={setUser} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
