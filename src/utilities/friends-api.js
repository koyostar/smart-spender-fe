import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/users`;

// const BASE_URL = "/api/users";

export function getFriendAPI(username) {
  return sendRequest(`${BASE_URL}/find/${username}`);
}

export function addFriendAPI(username) {
  return sendRequest(`${BASE_URL}/friends/add/${username}`, "POST");
}

export function deleteFriendAPI(username) {
  return sendRequest(`${BASE_URL}/friends/remove/${username}`, "POST");
}
