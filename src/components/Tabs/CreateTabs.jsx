import React from "react";
import { getUser } from "../../utilities/users-service";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CreateTabs() {
  const user = getUser().username;
  const location = useLocation();

  return (
    <div className="create">
      <div className="tabs">
        <Link to="/create/expense">
          <button
            className={`w-60 rounded-t-lg hover:bg-white hover:text-neutral-500 hover:text-lg ${
              location.pathname === "/create/expense"
                ? "text-white bg-[#004F8F]"
                : "bg-neutral-500 hover:text-white"
            }`}
          >
            Expense
          </button>
        </Link>
        <Link to="/create/transfer">
          <button
            className={`w-60 rounded-t-lg hover:bg-white hover:text-neutral-500 hover:text-lg ${
              location.pathname === "/create/transfer"
                ? "text-white bg-[#004F8F]"
                : "bg-neutral-500 hover:text-white"
            }`}
          >
            Transfer
          </button>
        </Link>
      </div>
      <h2>Hi {user.toUpperCase()}</h2>
    </div>
  );
}
