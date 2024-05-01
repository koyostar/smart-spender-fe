import { useState } from "react";
import { loginService } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

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
      //! setUser(user) -> from props
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
    <div className="container bg-[#004F8F] mx-auto max-w-md px-4 py-8 rounded-lg">
      <header className="text-white font-bold text-2xl text-center">
        Sign In
      </header>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-white"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="shadow-sm border border-[#57ABD8] text-white text-sm rounded-lg focus:ring-[#57ABD8] focus:border-[#57ABD8] block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="shadow-sm border border-[#57ABD8] text-white text-sm rounded-lg focus:ring-[#57ABD8] focus:border-[#57ABD8] block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#57ABD8] hover:bg-[#5D95D3] focus:ring-2 focus:outline-none focus:ring-[#57ABD8] font-medium text-lg px-3 py-2.5 text-center w-full rounded-lg"
        >
          Sign In
        </button>
        <footer className="mt-10">
          New to Smart Spender? <span className="text-black">Sign up here</span>
        </footer>
      </form>
    </div>
  );
}

export default LoginForm;
// TODO
// 1. add link to Signup Now
// 2. amend CSS
