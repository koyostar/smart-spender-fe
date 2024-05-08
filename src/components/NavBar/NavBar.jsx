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
    <nav>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 font-inter font-extralight">
        <div className="flex items-center">
          <span className="text-[#004F8F] self-center text-4xl font-bebas whitespace-nowrap mr-10">
            <Link to="/home">$mart $pender</Link>
          </span>
          <Link
            to="/home"
            className={`mr-6 text-lg hover:text-xl ${
              location.pathname === "/home"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`mr-6 text-lg hover:text-xl ${
              location.pathname === "/create"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Create
          </Link>
          <Link
            to="/history"
            className={`mr-6 text-lg hover:text-xl ${
              location.pathname === "/history"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            History
          </Link>
          <Link
            to="/friends"
            className={`mr-6 text-lg hover:text-xl ${
              location.pathname === "/friends"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Friends
          </Link>
        </div>
        <div className="flex items-center">
          <TbUserSquare className="text-4xl text-[#c7d154] mr-2" />
          <span className="text-sm">{user.username}</span>
          <Link
            to="/"
            onClick={handleLogOut}
            className="text-sm hover:underline ml-6"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
