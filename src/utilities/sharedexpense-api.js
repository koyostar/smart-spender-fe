import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/sharedexpense`;
// const BASE_URL = "/api/sharedexpense";

export function createSharedExpense(sharedExpenseDetails) {
  return sendRequest(`${BASE_URL}/create`, "POST", sharedExpenseDetails);
}
