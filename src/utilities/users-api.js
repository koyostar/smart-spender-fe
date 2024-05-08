// // API modules are where the code lives to communicate
// // with the server via AJAX

import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/users`;

// const BASE_URL = "/api/users";

export function signUpAPI(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkTokenAPI() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function findUsers() {
  return sendRequest(`${BASE_URL}/find`);
}

export function findUsersByID(id) {
  return sendRequest(`${BASE_URL}/find/id/${id}`);
}
