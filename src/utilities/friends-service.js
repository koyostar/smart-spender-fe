import {
  getAllFriends,
  searchFriends,
  addFriend,
  removeFriend,
} from "./friends-api";

export async function getAllFriendsService(userId) {
  try {
    const response = await getAllFriends(userId);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch friends.");
  }
}

export async function searchFriendsService(searchTerm) {
  try {
    const response = await searchFriends(searchTerm);
    return response;
  } catch (error) {
    throw new Error("Failed to search for friends.");
  }
}

export async function addFriendService(username) {
  try {
    const response = await addFriend(username);
    return response;
  } catch (error) {
    throw new Error("Failed to add friend.");
  }
}

export async function removeFriendService(username) {
  try {
    const response = await removeFriend(username);
    return response;
  } catch (error) {
    throw new Error("Failed to remove friend.");
  }
}
