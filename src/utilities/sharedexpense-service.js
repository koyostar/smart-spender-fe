import * as sharedExpenseAPI from "./sharedexpense-api";
import { getUser } from "./users-service";

export async function createSharedExpense(sharedExpenseDetails) {
  return sharedExpenseAPI.createSharedExpense(sharedExpenseDetails);
}

export async function findExpenseById(expenseid) {
  return sharedExpenseAPI.findByExpenseId(expenseid);
}

export async function updateSharedExpense(expenseid, userid, sharedExpenseDetails) {
  return sharedExpenseAPI.updateSharedExpense(expenseid, userid, sharedExpenseDetails);
}