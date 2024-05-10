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
    <nav className=" bg-darkpri font-bebas mb-5 py-3">
      <div className=" flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 place-content-around">
        <div className="flex items-center text-4xl place-content-around ">
          <span className="text-lightpri self-center text-5xl whitespace-nowrap">
            <Link to="/home">$mart $pender</Link>
          </span>
          <Link
            to="/home"
            className={`mx-10 ${
              location.pathname === "/home"
                ? "text-darkacc"
                : "text-lightpri hover:pb-1 hover:text-lightacc"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`mr-10 ${
              location.pathname === "/create"
                ? "text-darkacc"
                : "text-lightpri hover:pb-1 hover:text-lightacc"
            }`}
          >
            Create
          </Link>
          <Link
            to="/history"
            className={`mr-10 ${
              location.pathname === "/history"
                ? "text-darkacc"
                : "text-lightpri hover:pb-1 hover:text-lightacc"
            }`}
          >
            History
          </Link>
          <Link
            to="/friends"
            className={`mr-10 ${
              location.pathname === "/friends"
                ? "text-darkacc"
                : "text-lightpri hover:pb-1 hover:text-lightacc"
            }`}
          >
            Friends
          </Link>
        </div>
        <div className="text-lightacc flex items-center text-xl">
          <TbUserSquare className="text-4xl  mr-2" />
          <span>{user.username.toUpperCase()}</span>
          <Link
            to="/"
            onClick={handleLogOut}
            className="text-lightpri hover:pb-1 hover:text-lightacc ml-6"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
