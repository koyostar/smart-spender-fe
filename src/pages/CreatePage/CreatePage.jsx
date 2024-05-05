import React from "react";
import { Link } from "react-router-dom";

export default function Create() {
  return (
    <>
      <Link to="/create/expense">Expense</Link>
      &nbsp; | &nbsp;
      <Link to="/create/transfer">Transfer</Link>
    </>
  );
}
