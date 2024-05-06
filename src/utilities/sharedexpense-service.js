import * as sharedExpenseAPI from "./sharedexpense-api";
import { getUser } from "./users-service";

export async function createSharedExpense(sharedExpenseDetails) {
  return sharedExpenseAPI.createSharedExpense(sharedExpenseDetails);
}
