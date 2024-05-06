import { getFriendAPI, addFriendAPI, deleteFriendAPI } from "./friends-api";

export async function getAllFriendsService() {
  const allFriends = await getFriendAPI();
  return allFriends;
}

export async function addFriendService(username) {
  try {
    const response = await addFriendAPI(username);
    return response;
  } catch (error) {
    console.error("Failed to add friend:", error);
    throw error;
  }
}

export async function deleteFriendService(username) {
  try {
    const response = await deleteFriendAPI(username);
    return response;
  } catch (error) {
    console.error("Failed to remove friend:", error);
    throw error;
  }
}
