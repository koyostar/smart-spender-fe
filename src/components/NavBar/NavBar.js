import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Remove token using the user service
    userService.logOut();
    // Update user state in App
    setUser(null);
  }

  return (
    <nav>
      <h1>Welcome, {user.name}</h1>
      <Link to="/home">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/expenses/create">Create</Link>
      &nbsp; | &nbsp;
      <Link to="/expenses/history">History</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
