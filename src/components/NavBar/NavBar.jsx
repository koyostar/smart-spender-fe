import { Link, useNavigate } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    // Remove token using the user service
    logOutService();
    // Update user state in App
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      <h1>Welcome, {user.username}</h1>
      <Link to="/home">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/create">Create</Link>
      &nbsp; | &nbsp;
      <Link to="/history">History</Link>
      &nbsp; | &nbsp;
      <Link to="/" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
