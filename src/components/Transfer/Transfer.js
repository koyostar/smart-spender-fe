import React, { useState, useEffect } from "react";
import * as expenseAPI from "../../utilities/expense-api";
import * as transferService from "../../utilities/transfer-service";
import * as sharedExpenseAPI from "../../utilities/sharedexpense-api";
import * as sharedExpenseService from "../../utilities/sharedexpense-service";
import "./Transfer.css";
import CreateTabs from "../Tabs/CreateTabs";
import { getUser } from "../../utilities/users-service";

export default function Transfer() {
  const [transferDetails, setTransferDetails] = useState({});
  const [expDescription, setExpDescription] = useState();
  const [expList, setExpList] = useState([]);

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

  function handleChange(evt) {
    setTransferDetails({
      ...transferDetails,
      [evt.target.name]: evt.target.value,
    });
  }

  async function handleSelect(evt) {
    setExpDescription(evt.target.value);
    const selectedIndex = await evt.target.options.selectedIndex;
    setTransferDetails({
      ...transferDetails,
      expenseId: expList[selectedIndex].expenseId,
      to: expList[selectedIndex].createdBy,
    });
  }
  useEffect(() => {

  }, [transferDetails]);
 
  async function handleSubmit(evt) {
    evt.preventDefault();
    const userid = getUser()._id
    let expenseid = transferDetails.expenseId
    transferService.createTransfer(transferDetails);
    const reqExpenses = await sharedExpenseAPI.findByExpenseId(expenseid)
    const result = reqExpenses.find(({user}) => user === userid)
    console.log(result)
    let newAmountOwed = result.amountOwed - transferDetails.amount
    let newAmountPaid = result.amountPaid + transferDetails.amount
    const sharedExpenseDetails = ({
      ...result,
      amountOwed: newAmountOwed,
      amountPaid: newAmountPaid,
      isPaid: true,
    })
    sharedExpenseService.updateSharedExpense(expenseid, userid, sharedExpenseDetails)
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
          <select
            name="expenseId"
            value={expDescription}
            onChange={handleSelect}
          >
            {expList.map((expense) => (
              <option key={expense._id}>
                ExpenseID {expense.expenseId} - {expense.description}
              </option>
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
