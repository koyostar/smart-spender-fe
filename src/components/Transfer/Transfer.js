import React, { useState, useEffect } from "react";
import * as expenseAPI from "../../utilities/expense-api";
import * as usersAPI from "../../utilities/users-api";

export default function Transfer() {
  const [expList, setExpList] = useState([]);
  const [expDetails, setExpDetails] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await expenseAPI.findExpenses();
      setExpList(expenses);
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

  function handleSubmit() {}

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Amount</label>
          <input
            type="number"
            name="Amount"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Expense</label>
          <select
            name="expense"
            value={expDetails}
            onChange={(e) => setExpDetails(e.target.value)}
          >
            {expList.map((expense) => (
              <option>{expense.description}</option>
            ))}
          </select>
          <br />
          <label>To</label>
          <select
            name="friend"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            {userList.map((user) => (
              <option>{user.username}</option>
            ))}
          </select>
          <br />
          <label>Description</label>
          <input type="text" name="Description" onChange={handleChange}></input>
          <div>
            <button type="submit">+ Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
