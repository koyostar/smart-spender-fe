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
    <div className="container font-bold bg-lightsec mx-auto max-w-md p-4 rounded-2xl">
      <form className="p-2" onSubmit={handleSubmit}>
        <header className="text-darkpri text-2xl mb-4">SIGN IN</header>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-lg text-darkpri">
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            autoComplete="off"
            value={credentials.username}
            onChange={handleChange}
            className="bg-lightpri text-darksec text-sm focus:outline-none block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-lg text-darkpri">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={credentials.password}
            onChange={handleChange}
            className="bg-lightpri text-darksec text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-lightpri bg-darkpri hover:bg-darksec focus:ring-2 focus:outline-none focus:ring-gray-400 text-3xl px-3 py-2.5 text-center w-full rounded-2xl"
        >
          SIGN IN
        </button>
        <footer className="text-darkpri mt-6 text-center">
          New to Smart Spender?
          <br />
          <Link to="/signup">
            <span className="text-lightpri text-md btn btn-ghost btn-sm bg-darkpri hover:bg-darksec rounded-md normal-case">
              Sign up now!
            </span>
          </Link>
        </footer>
      </form>
    </div>
  );
}

export default LoginForm;
