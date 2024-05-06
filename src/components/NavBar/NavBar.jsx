import { Link, useNavigate } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";
import { TbUserSquare } from "react-icons/tb";

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
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 font-inter font-extralight">
        <div className="flex items-center">
          <span className="self-center text-4xl font-bebas whitespace-nowrap mr-10">
            Smart Spender
          </span>
          <Link to="/home" className="mr-6 text-md  text-white hover:underline">
            Home
          </Link>
          <Link
            to="/create"
            className="text-md  text-white hover:underline mr-6"
          >
            Create
          </Link>
          <Link to="/history" className="text-md  text-white hover:underline">
            History
          </Link>
        </div>
        <div className="flex items-center">
          <TbUserSquare className="text-4xl text-[#57ABD8] mr-2" />
          <span className="mr-6 text-sm">{user.username}</span>
          <Link
            to="/"
            onClick={handleLogOut}
            className="mr-6 text-sm hover:underline"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
