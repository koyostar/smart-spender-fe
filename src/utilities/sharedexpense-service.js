import * as sharedExpenseAPI from "./sharedexpense-api";
import { getUser } from "./users-service";

export async function createSharedExpense(sharedExpenseDetails) {
  return sharedExpenseAPI.createSharedExpense(sharedExpenseDetails);
}

export async function findExpenseById(expenseid) {
  return sharedExpenseAPI.findByExpenseId(expenseid);
}

export async function updateSharedExpense(expenseid, userid, amount) {
  const sharedExpenses = await findExpenseById(expenseid)
  console.log(sharedExpenses)
  let sharedExpenseDetails = {}
  sharedExpenses.forEach(expense => {
    console.log(expense.user)
    console.log(userid)
    if (expense.user === getUser()._id)
    sharedExpenseDetails = {...expense, amountOwed: expense.amountOwed - amount, amountPaid: expense.amountPaid + amount, isPaid : expense.amountOwed === 0}
  });
  return sharedExpenseAPI.updateSharedExpense(expenseid, userid, sharedExpenseDetails);
}