import React, { useState, useEffect } from "react";
import * as expenseService from "../../utilities/expense-service";
import SharedWith from "../SharedWith/SharedWith";
import { v4 as uuidv4 } from "uuid";
import "./Expense.css";
import CreateTabs from "../Tabs/CreateTabs";

export default function Expense() {
  const [expenseDetails, setExpenseDetails] = useState({ category: "travel" });
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Travel");
  const [sharedAmt, setSharedAmt] = useState("0");
  const [validateSharedAmt, setValidateSharedAmt] = useState(true);
  const [sharedExpenses, setSharedExpenses] = useState([
    { id: uuidv4(), friend: "", amount: 0 },
  ]);

  function handleSelect(evt) {
    setCategory(evt.target.value);
    setExpenseDetails({
      ...expenseDetails,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleChange(evt) {
    setExpenseDetails({
      ...expenseDetails,
      [evt.target.name]: evt.target.value,
    });
    setError("");
    console.log("expense details", expenseDetails);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    try {
      expenseService.createExpense(expenseDetails);
    } catch (error) {
      setError("Expense failed to log");
    }
  }

  const checkSharedAmount = function () {
    if (!expenseDetails.amount) {
      return true;
    } else if (sharedAmt > expenseDetails.amount) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setValidateSharedAmt(checkSharedAmount());
  }, [sharedAmt]);

  useEffect(() => {
    setValidateSharedAmt(checkSharedAmount());
  }, [expenseDetails]);

  return (
    <div className="expense-container  font-bebas">
      <CreateTabs />
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="incurredDate"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={handleSelect}
            required
          >
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="accommodation">Accommodation</option>
          </select>
          <br />
          <label>Amount</label>
          <input
            type="number"
            min="0"
            name="amount"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange}></input>
          <div>
            <label>Shared with:</label>
            <br />
            <SharedWith
              sharedAmt={sharedAmt}
              setSharedAmt={setSharedAmt}
              sharedExpenses={sharedExpenses}
              setSharedExpenses={setSharedExpenses}
              expenseDetails={expenseDetails}
              setExpenseDetails={setExpenseDetails}
              key="0"
            />
            {validateSharedAmt
              ? "Shared amount total must be less than Amount!"
              : null}
          </div>
          <div>
            <button type="submit" disabled={validateSharedAmt}>
              + Add expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
