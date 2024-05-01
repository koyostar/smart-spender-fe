import { useState } from "react";

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeat: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container bg-[#004F8F] mx-auto max-w-md px-4 py-8 rounded-lg">
      <header className="text-white font-bold text-2xl text-center">
        Create an account to start using{" "}
        <span className="text-[#57ABD8] text-3xl">Smart Spender</span>
      </header>
      <form className="p-4 mt-4 rounded-lg">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-sm border border-[#57ABD8] text-white text-sm rounded-lg focus:ring-[#57ABD8] focus:border-[#57ABD8] block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
        </div>
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
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
            className="shadow-sm border border-[#57ABD8] text-white text-sm rounded-lg focus:ring-[#57ABD8] focus:border-[#57ABD8] block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            className="shadow-sm border border-[#57ABD8] text-white text-sm rounded-lg focus:ring-[#57ABD8] focus:border-[#57ABD8] block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#57ABD8] hover:bg-[#5D95D3] focus:ring-2 focus:outline-none focus:ring-[#57ABD8] font-medium text-lg px-3 py-2.5 text-center w-full rounded-lg"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
