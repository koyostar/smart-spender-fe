import { Link, useNavigate, useLocation } from "react-router-dom";
import { TbUserSquare } from "react-icons/tb";
import { logOutService } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutService();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-pricol mb-5">
      <div className=" flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 place-content-around">
        <div className="flex items-center text-3xl place-content-around ">
          <span className="text-white font-bebas self-center text-5xl whitespace-nowrap">
            <Link to="/home">$mart $pender</Link>
          </span>
          <Link
            to="/home"
            className={`mx-10 ${
              location.pathname === "/home"
                ? "text-acccol"
                : "text-white hover:text-white hover:underline"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`mr-10 ${
              location.pathname === "/create"
                ? "text-acccol"
                : "text-white hover:text-white hover:underline"
            }`}
          >
            Create
          </Link>
          <Link
            to="/history"
            className={`mr-10 ${
              location.pathname === "/history"
                ? "text-acccol"
                : "text-white hover:text-white hover:underline"
            }`}
          >
            History
          </Link>
          <Link
            to="/friends"
            className={`mr-10 ${
              location.pathname === "/friends"
                ? "text-acccol"
                : "text-white hover:text-white hover:underline"
            }`}
          >
            Friends
          </Link>
        </div>
        <div className="text-seccol flex items-center text-xl">
          <TbUserSquare className="text-4xl text-acccol mr-2" />
          <span>{user.username}</span>
          <Link
            to="/"
            onClick={handleLogOut}
            className="text-white hover:underline ml-6"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
