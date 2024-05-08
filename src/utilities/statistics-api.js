import sendRequest from "./send-request";
import { getUser } from "./users-service";

const apiUrl = process.env.REACT_APP_API_URL;

const BASE_URL = `${apiUrl}/api/statistics`;
// const BASE_URL = "/api/statistics";

export function fetchStats() {
  return sendRequest(`${BASE_URL}?userid=${getUser()._id}`);
}
