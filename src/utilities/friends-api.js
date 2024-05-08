import sendRequest from "./send-request";

const apiUrl = process.env.REACT_APP_API_URL;

// const BASE_URL = `${apiUrl}/api/users`;

const BASE_URL = "/api/users";

export function getAllFriends(userId) {
  return sendRequest(`${BASE_URL}/find/id/${userId}/friends`);
}

export function searchFriends(searchTerm) {
  return sendRequest(`${BASE_URL}/friends/search/${searchTerm}`);
}

export function addFriend(username) {
  return sendRequest(`${BASE_URL}/friends/add/${username}`, "POST");
}

export function removeFriend(username) {
  return sendRequest(`${BASE_URL}/friends/remove/${username}`, "POST");
}
