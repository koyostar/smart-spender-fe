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
  const [sharedExpenses, setSharedExpenses] = useState([
    { id: uuidv4(), friend: "", amount: 0 },
  ]);

  // Validators
  const [validateSharedAmt, setValidateSharedAmt] = useState(true);
  const [validateFriendSelect, setValidateFriendSelect] = useState(true);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);

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

  // check if friends are selected
  function checkFriendSelected() {
    const friendIds = [];
    for (let i = 0; i < sharedExpenses.length; i++) {
      const sharedExpense = sharedExpenses[i];
      friendIds.push(sharedExpense.friend);
    }
    return friendIds.includes("");
  }

  // check if shared amounts exceed amount
  function checkSharedAmountExceeds() {
    if (!expenseDetails.amount) return true;
    if (sharedAmt > expenseDetails.amount) return true;
    else return false;
  }

  // set disable state for submit button
  function validateFields() {
    if (!expenseDetails.amount) return true;
    else if (checkFriendSelected()) return true;
    else if (checkSharedAmountExceeds()) return true;
    else return false;
  }

  useEffect(() => {
    setValidateSharedAmt(checkSharedAmountExceeds());
    setValidateFriendSelect(checkFriendSelected());
    setDisableSubmitBtn(validateFields());
  }, [expenseDetails]);

  return (
    <div className="app-container">
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
            {validateFriendSelect ? (
              <p>You must select a friend to share expenses</p>
            ) : null}
            <br></br>
            {validateSharedAmt ? (
              <p>Shared amount total must be less than Amount!</p>
            ) : null}
          </div>
          <div>
            <button type="submit" disabled={disableSubmitBtn}>
              + Add expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
