import { useState } from "react";
import { signUpService } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignUpForm({ setUser }) {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    repeat: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUpService(userData);
      console.log(user);
      setUser(user);
      if (user && !user.error) {
        navigate("/home");
      } else {
        navigate("/signup");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container bg-lightsec font-bold rounded-2xl mx-auto max-w-md p-4">
      <form className="p-2" onSubmit={handleSubmit} autoComplete="off">
        <header className="text-darkpri text-2xl mb-4">
          Register with{" "}
          <span className="text-darkpri text-4xl font-bebas">$mart$pender</span>
        </header>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-darkpri">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="bg-lightpri text-darkpri text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text border-none"
            placeholder="name@email.com"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm text-darkpri">
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="off"
            className="bg-lightpri text-darkpri text-sm focus:outline-none block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm text-darkpri">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-lightpri text-darkpri text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm text-darkpri"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            name="repeat"
            value={userData.repeat}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Repeat Password"
            className="bg-lightpri text-darkpri text-sm focus:ring-zinc-500 block focus:outline-none w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-lightpri bg-darkpri hover:bg-darksec focus:outline-none focus:ring-gray-400 text-3xl px-3 py-2.5 text-center w-full rounded-xl"
        >
          SIGN UP
        </button>
      </form>
      <Link to="/login">
        <span className="text-lightpri text-md btn btn-ghost btn-sm bg-darkpri hover:bg-darksec rounded-md absolute top-4 right-4 normal-case">
          Sign In
        </span>
      </Link>
    </div>
  );
}

export default SignUpForm;
