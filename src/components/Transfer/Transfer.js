import React, { useState, useEffect } from "react";
import * as expenseAPI from "../../utilities/expense-api";
import * as usersAPI from "../../utilities/users-api";
import * as transferService from "../../utilities/transfer-service";
import "./Transfer.css";
import CreateTabs from "../Tabs/CreateTabs";

export default function Transfer() {
  const [transferDetails, setTransferDetails] = useState({});

  const [expList, setExpList] = useState([]);
  const [expDescription, setExpDescription] = useState();

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await expenseAPI.findExpenses();
      setExpList(expenses);
      setTransferDetails({
        ...transferDetails,
        expense: expenses[0]._id,
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
    if (evt.target.name === "expense") {
      setExpDescription(evt.target.value);
      const selectedIndex = evt.target.options.selectedIndex;
      setTransferDetails({
        ...transferDetails,
        expense: expList[selectedIndex]._id,
      });
    } else {
      setUser(evt.target.value);
      const selectedIndex = evt.target.options.selectedIndex;
      setTransferDetails({
        ...transferDetails,
        to: userList[selectedIndex]._id,
      });
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    transferService.createTransfer(transferDetails);
    // console.log(transferDetails);
  }

  return (
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
          <select name="expense" value={expDescription} onChange={handleSelect}>
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
          <div>
            <button type="submit">+ Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
