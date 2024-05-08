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
      <div className="font-bebas flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 font-inter font-extralight place-content-around">
        <div className="flex items-center font-bebas text-3xl place-content-around ">
          <span className="text-[#004F8F] self-center text-5xl whitespace-nowrap">
            <Link to="/home">$mart $pender</Link>
          </span>
          <Link
            to="/home"
            className={`mx-10 hover:text-3xl ${
              location.pathname === "/home"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`mr-10 hover:text-xl ${
              location.pathname === "/create"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Create
          </Link>
          <Link
            to="/history"
            className={`mr-10 hover:text-xl ${
              location.pathname === "/history"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            History
          </Link>
          <Link
            to="/friends"
            className={`mr-10 hover:text-xl ${
              location.pathname === "/friends"
                ? "text-white hover:text-lg"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Friends
          </Link>
        </div>
        <div className="flex items-center font-bebas text-xl">
          <TbUserSquare className="text-4xl text-neutral-500 mr-2" />
          <span>{user.username}</span>
          <Link to="/" onClick={handleLogOut} className="hover:underline ml-6">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
