import React, { useState, useEffect } from "react";
import * as transferService from "../../utilities/transfer-service";
import * as sharedExpenseAPI from "../../utilities/sharedexpense-api";
import * as sharedExpenseService from "../../utilities/sharedexpense-service";
import CreateTabs from "../Tabs/CreateTabs";
import { getUser } from "../../utilities/users-service";

export default function Transfer() {
  const [transferDetails, setTransferDetails] = useState({});
  const [expList, setExpList] = useState([]);
  const [owedAmount, setOwedAmount] = useState(0);
  const [user, setUser] = useState(getUser());

  // Validators
  const [validateExpenseSelect, setValidateExpenseSelect] = useState(true);
  const [validateTransferAmt, setValidateTransferAmt] = useState(true);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);

  useEffect(() => {
    const fetchSharedExpenses = async () => {
      const sharedExpensesData = await sharedExpenseAPI.findByUserIdWithExpenses(user._id);
      const sharedExpenses = sharedExpensesData.sharedExpenses;
      const expenses = sharedExpensesData.expenses;

      // loop through each sharedExpenses and expenses and combine into a single object
      async function createExpOptions() {
        const sharedExpensesOptions = [];
        for (let i = 0; i < sharedExpenses.length; i++) {
          const sharedExpense = sharedExpenses[i];
          const expense = expenses[i][0];
          const expenseOption = {
            ...sharedExpense,
            createdBy: expense.createdBy,
            incurredDate: expense.incurredDate,
            description: expense.description,
            category: expense.category,
          };
          sharedExpensesOptions.push(expenseOption);
        }
        return sharedExpensesOptions;
      }
      
      const sharedExpensesList = await createExpOptions();
      setExpList(sharedExpensesList);

      // define default "from" value
      setTransferDetails({
        from: user._id,
      });
    };
    fetchSharedExpenses();
  }, [user]);

  function handleChange(evt) {
    setTransferDetails({
      ...transferDetails,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSelect(evt) {
    const selectedIndex = evt.target.value;
    if (selectedIndex >= 0) {
      setTransferDetails({
        ...transferDetails,
        expenseId: expList[selectedIndex].expenseId,
        to: expList[selectedIndex].createdBy,
      });
      setOwedAmount(expList[selectedIndex].amountOwed)
    } else {
      setTransferDetails({
        ...transferDetails,
        expenseId: null,
        to: null,
      });
      setOwedAmount(0);
    }
  }

  // check if expense is selected
  function checkExpenseSelected() {
    if (!transferDetails.expenseId) return true;
    else return false;
  }

  // check if transferred amounts exceed amount
  function checkTransferAmt() {
    if (!transferDetails.amount) return true;
    if (transferDetails.amount > owedAmount) return true;
    else return false;
  }
  
  // set disable state for submit button
  function validateFields() {
    if (!transferDetails.amount) return true;
    else if (checkExpenseSelected()) return true;
    else if (checkTransferAmt()) return true;
    else return false;
  }

  // run validator to disable submit button
  useEffect(() => {
    setValidateExpenseSelect(checkExpenseSelected())
    setValidateTransferAmt(checkTransferAmt());
    setDisableSubmitBtn(validateFields());
  }, [transferDetails]);

  function handleSubmit(evt) {
    try {
      evt.preventDefault();

      // get the selected expense details
      const userid = user._id;
      let expenseid = transferDetails.expenseId;
      const expenseDetails = expList.filter((expense) => (expense.expenseId == expenseid));

      // calculate the amount paid to update sharedExpense owed amount
      let newAmountOwed = Math.round(
        ((parseFloat(expenseDetails[0].amountOwed) - parseFloat(transferDetails.amount)) * 100)
      ) / 100;
      let newAmountPaid = Math.round(
        ((parseFloat(expenseDetails[0].amountPaid) + parseFloat(transferDetails.amount)) * 100)
      ) / 100;
      let clearedDebt = false;
      if (newAmountOwed <= 0) {
        clearedDebt = true;
      };

      const sharedExpenseDetails = ({
        ...expenseDetails[0],
        amountOwed: newAmountOwed,
        amountPaid: newAmountPaid,
        isPaid: clearedDebt,
      });

      sharedExpenseService.updateSharedExpense(expenseid, userid, sharedExpenseDetails)

      // create the transfer record
      transferService.createTransfer(transferDetails); 
    } catch (error) {
      console.log("Failed to transfer expense");
    }
  }

  return (
    <div className="tabs-container">
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
            min={0}
            required
          ></input>
          <br />
          <label>Expense</label>
          <select
            name="expenseId"
            onChange={handleSelect}
          >
            <option index="-1">Select a shared expense</option>
            {expList.length > 0
              ? expList.map((expense, index) => (
              <option value={index} key={expense._id}>
                ID {expense.expenseId} - {expense.description}
              </option>
              ))
              : null
            }
          </select>
          <br />
          { owedAmount > 0
            ? <>Owed amount: {owedAmount}<br /></>
            : null
          }
          { validateExpenseSelect
            ? <>Please select an expense to pay!<br /></>
            : null
          }
          { validateTransferAmt
            ? <>Transfer amount cannot be more than owed amount!<br /></>
            : null
          }
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange} required></input>
          <br />
          <div>
            <button className="submit-btn" type="submit" disabled={disableSubmitBtn}>
              + Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
