import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/transfer`;
// const BASE_URL = "/api/transfer";

export function createTransfer(transferDetails) {
  return sendRequest(`${BASE_URL}/create`, "POST", transferDetails);
}

export function findTransfers() {
  return sendRequest(`${BASE_URL}/find`);
}

export function updateExpense() {
  return sendRequest(`${BASE_URL}/update/:expenseid`)
}