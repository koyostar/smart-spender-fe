import React from "react";
import { getUser } from "../../utilities/users-service";
import { Link } from "react-router-dom";

export default function SummaryTabs() {
  const user = getUser().username;
  return (
    <div className="user-summary">
      <h1>Hi {user.toUpperCase()}</h1>
      <div className="tabs">
        <Link to="/summary">
          <button className="summary-button">Summary</button>
        </Link>
        <Link to="/debt">
          <button className="debt-button">Debt</button>
        </Link>
        <Link to="/payment">
          <button className="payment-button">Loan</button>
        </Link>
      </div>
    </div>
  );
}
