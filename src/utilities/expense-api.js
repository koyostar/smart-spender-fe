import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/users`;

export function createExpense(expenseDetails) {
    return sendRequest(`${BASE_URL}/create`, 'POST', expenseDetails)
}