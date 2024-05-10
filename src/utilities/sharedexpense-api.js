import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/shared-expenses`;
// const BASE_URL = "/api/shared-expenses";

export function createSharedExpense(sharedExpenseDetails) {
  return sendRequest(`${BASE_URL}/create`, "POST", sharedExpenseDetails);
}

export function findByUserIdWithExpenses(userId) {
  return sendRequest(`${BASE_URL}/find/user/${userId}/expenses`);
}

export function findByExpenseId(expenseid) {
  return sendRequest(`${BASE_URL}/find/expenseid/${expenseid}`);
}

export function updateSharedExpense(expenseid, userid, sharedExpenseDetails) {
  return sendRequest(`${BASE_URL}/update/${expenseid}/${userid}`, "POST", sharedExpenseDetails);
}