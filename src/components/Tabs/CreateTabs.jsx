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
            className={`create-tab-btn ${
              location.pathname === "/create/expense"
                ? "text-white bg-pricol"
                : "bg-acccol hover:text-acccol hover:bg-white"
            }`}
          >
            Expense
          </button>
        </Link>
        <Link to="/create/transfer">
          <button
            className={`create-tab-btn  ${
              location.pathname === "/create/transfer"
                ? "text-white bg-pricol"
                : "bg-acccol hover:text-acccol hover:bg-white"
            }`}
          >
            Transfer
          </button>
        </Link>
      </div>
    </div>
  );
}
