// // API modules are where the code lives to communicate
// // with the server via AJAX

import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/users`;
// const BASE_URL = "/api/users"

export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
