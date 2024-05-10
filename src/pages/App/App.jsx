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
import FriendsPage from "../../pages/FriendsPage/FriendsPage";
import UserSummary from "../../components/UserSummary/UserSummary";
import Debt from "../../components/UserSummary/Debt";
import Payment from "../../components/UserSummary/Payment";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="h-screen min-w-screen bg-moneybg bg-contain">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route
              path="/home"
              element={<Home user={user} setUser={setUser} />}
            />
            <Route path="/summary" element={<UserSummary />} />
            <Route path="/debt" element={<Debt />} />
            <Route path="/loan" element={<Payment />} />

            <Route
              path="/create"
              element={<Create user={user} setUser={setUser} />}
            />
            <Route path="/history" element={<History />} />
            <Route path="/create/expense" element={<Expense />} />
            <Route path="/create/transfer" element={<Transfer />} />
            <Route
              path="/friends"
              element={<FriendsPage userId={user._id} />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<AuthPage setUser={setUser} />}>
            <Route path="signup" element={<SignUpForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      )}
    </main>
  );
}

export default App;
