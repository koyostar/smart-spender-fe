import React, { useState, useEffect } from "react";
import * as expenseAPI from "../../utilities/expense-api";
import * as usersAPI from "../../utilities/users-api";
import * as transferService from "../../utilities/transfer-service";
import * as sharedExpenseAPI from "../../utilities/sharedexpense-api"
import * as sharedExpenseService from "../../utilities/sharedexpense-service";
import "./Transfer.css";
import CreateTabs from "../Tabs/CreateTabs";
import CreateTabs from "../Tabs/CreateTabs";

export default function Transfer() {
  const [transferDetails, setTransferDetails] = useState({});
  const [expenseId, setExpenseId] = useState()
  const [userId, setUserId] = useState()

  const [expList, setExpList] = useState([]);
  const [expDescription, setExpDescription] = useState();

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await expenseAPI.findExpenses();
      setExpList(expenses);
      setTransferDetails({
        ...transferDetails,
        expenseId: expenses[0].expenseId,
      });
    };
    fetchExpenses();
  }, []);

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersAPI.findUsers();
      setUserList(users);
      setTransferDetails({
        ...transferDetails,
        to: users[0]._id,
      });
    };
    fetchUsers();
  }, []);

  function handleChange(evt) {
    setTransferDetails({
      ...transferDetails,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSelect(evt) {
    if (evt.target.name === "expenseId") {
      setExpDescription(evt.target.value);
      const selectedIndex = evt.target.options.selectedIndex;
      setExpenseId(expList[selectedIndex].expenseId)
      setTransferDetails({
        ...transferDetails,
        expenseId: expList[selectedIndex].expenseId,
      });
    } else {
      setUser(evt.target.value);
      const selectedIndex = evt.target.options.selectedIndex;
      setUserId(userList[selectedIndex]._id)
      setTransferDetails({
        ...transferDetails,
        to: userList[selectedIndex]._id,
      });
    }
  }
  

  async function handleSubmit(evt) {
    evt.preventDefault();
    transferService.createTransfer(transferDetails);
    console.log(transferDetails)
    sharedExpenseService.updateSharedExpense(transferDetails.expenseId, transferDetails.to, transferDetails.amount)
  }



  return (
    <div className="transfer-container font-bebas">
      <CreateTabs />
    <div className="transfer-container font-bebas">
      <CreateTabs />
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="transferDate"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Expense</label>
          <select name="expenseId" value={expDescription} onChange={handleSelect}>
            {expList.map((expense) => (
              <option key={expense._id}>{expense.description}</option>
            ))}
          </select>
          <br />
          <label>To</label>
          <select name="to" value={user} onChange={handleSelect}>
            {userList.map((user) => (
              <option key={user._id}>{user.username}</option>
            ))}
          </select>
          <br />
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange}></input>
          <br />
          <div>
            <button type="submit">+ Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
