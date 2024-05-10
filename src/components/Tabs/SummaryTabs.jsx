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
            className={`summary-tab-btn ${
              location.pathname === "/summary"
                ? "text-white bg-pricol"
                : "bg-acccol hover:text-acccol hover:bg-white"
            }`}
          >
            Summary
          </button>
        </Link>
        <Link to="/debt">
          <button
            className={`summary-tab-btn ${
              location.pathname === "/debt"
                ? "text-white bg-pricol"
                : "bg-acccol hover:text-acccol hover:bg-white"
            }`}
          >
            Debt
          </button>
        </Link>
        <Link to="/loan">
          <button
            className={`summary-tab-btn ${
              location.pathname === "/loan"
                ? "text-white bg-pricol"
                : "bg-acccol hover:text-acccol hover:bg-white"
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
