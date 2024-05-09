import { useState } from "react";
import { loginService } from "../../utilities/users-service";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService(credentials);
      console.log(user);
      setUser(user);
      if (user && !user.error) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container bg-neutral-400 mx-auto max-w-md p-4">
      <form className="p-2" onSubmit={handleSubmit}>
        <header className="text-white font-light text-2xl mb-4">Sign In</header>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-normal text-gray-600"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            autoComplete="off"
            value={credentials.username}
            onChange={handleChange}
            className="bg-neutral-300 text-gray-900 text-sm focus:outline-none block w-full p-2.5 cursor-text font-extralight border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-normal text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={credentials.password}
            onChange={handleChange}
            className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text font-extralight border-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#004F8F] hover:bg-[#57ABD8] focus:ring-2 focus:outline-none focus:ring-gray-400 font-normal text-3xl px-3 py-2.5 text-center w-full"
        >
          Sign In
        </button>
        <footer className="mt-6">
          New to Smart Spender?{" "}
          <Link to="/signup">
            <span className="text-white text-md btn btn-ghost btn-sm bg-[#004F8F] hover:bg-[#57ABD8] rounded-md normal-case">
              Sign up now!
            </span>
          </Link>
        </footer>
      </form>
    </div>
  );
}

export default LoginForm;
