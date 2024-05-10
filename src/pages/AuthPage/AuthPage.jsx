import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function AuthPage({ setUser }) {
  const location = useLocation();

  return (
    <>
      <span className="whitespace-nowrap absolute top-4 left-4">
        <Link to="/">
          <span className="text-darkpri font-bebas text-5xl font-bold">
            $mart $pender
          </span>
        </Link>
      </span>

      <main className="text-lightpri p-4 container flex mx-auto min-h-screen items-center justify-center">
        {location.pathname === "/signup" ? (
          <SignUpForm setUser={setUser} />
        ) : location.pathname === "/login" ? (
          <LoginForm setUser={setUser} />
        ) : null}
      </main>
    </>
  );
}
export default AuthPage;
