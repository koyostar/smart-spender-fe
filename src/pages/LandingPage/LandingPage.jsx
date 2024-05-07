import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <span className="text-[#004F8F] text-4xl font-bebas whitespace-nowrap absolute top-4 left-4">
        $mart $pender
      </span>
      <div className="hero min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Splitting costs, not friendships.
            </h1>
            <Link to="/signup">
              <button className="btn btn-ghost text-white text-2xl bg-[#004F8F] hover:bg-[#57ABD8] rounded-md normal-case">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Link to="/login">
        <span className="text-white text-md btn btn-ghost btn-sm bg-[#004F8F] hover:bg-[#57ABD8] rounded-md absolute top-4 right-4 normal-case">
          Sign In
        </span>
      </Link>
    </>
  );
}

export default LandingPage;
