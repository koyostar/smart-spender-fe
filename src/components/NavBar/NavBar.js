import { Link } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    // Remove token using the user service
    logOutService();
    // Update user state in App
    setUser(null);
  };

  return (
    <nav>
      <h1>Welcome, {user.username}</h1>
      <Link to="/home">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/expenses/create">Create</Link>
      &nbsp; | &nbsp;
      <Link to="/expenses/history">History</Link>
      &nbsp; | &nbsp;
      <Link to="/" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
