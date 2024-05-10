import React from "react";
import { getUser } from "../../utilities/users-service";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SummaryTabs() {
  const location = useLocation();

  return (
    <div className="user-summary">
      <div className="tabs">
        <Link to="/summary">
          <button
            className={`summary-tab-btn ${
              location.pathname === "/summary"
                ? "text-darkpri bg-lightsec"
                : "text-lightsec bg-lightpri hover:text-darksec hover:bg-lightacc"
            }`}
          >
            Summary
          </button>
        </Link>
        <Link to="/debt">
          <button
            className={`summary-tab-btn ${
              location.pathname === "/debt"
                ? "text-darkpri bg-lightsec"
                : "text-lightsec bg-lightpri hover:text-darksec hover:bg-lightacc"
            }`}
          >
            Debt
          </button>
        </Link>
        <Link to="/loan">
          <button
            className={`summary-tab-btn ${
              location.pathname === "/loan"
                ? "text-darkpri bg-lightsec"
                : "text-lightsec bg-lightpri hover:text-darksec hover:bg-lightacc"
            }`}
          >
            Loan
          </button>
        </Link>
      </div>
    </div>
  );
}
