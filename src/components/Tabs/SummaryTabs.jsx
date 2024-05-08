import React from "react";
import { getUser } from "../../utilities/users-service";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SummaryTabs() {
  const user = getUser().username;
  const location = useLocation();

  return (
    <div className="user-summary">
      <div className="tabs">
        <Link to="/summary">
          <button
            className={`w-40 rounded-t-lg hover:bg-white hover:text-neutral-500 hover:text-lg ${
              location.pathname === "/summary"
                ? "text-white bg-[#004F8F]"
                : "bg-neutral-500 hover:text-white"
            }`}
          >
            Summary
          </button>
        </Link>
        <Link to="/debt">
          <button
            className={`w-40 rounded-t-lg hover:bg-white hover:text-neutral-500 hover:text-lg ${
              location.pathname === "/debt"
                ? "text-white bg-[#004F8F]"
                : "bg-neutral-500 hover:text-white"
            }`}
          >
            Debt
          </button>
        </Link>
        <Link to="/loan">
          <button
            className={`w-40 rounded-t-lg hover:bg-white hover:text-neutral-500 hover:text-lg ${
              location.pathname === "/loan"
                ? "text-white bg-[#004F8F]"
                : "bg-neutral-500 hover:text-white"
            }`}
          >
            Loan
          </button>
        </Link>
      </div>
      <h2>Hi {user.toUpperCase()}</h2>
    </div>
  );
}
