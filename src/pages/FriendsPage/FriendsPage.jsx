import { useState, useEffect, useCallback } from "react";
import {
  getAllFriendsService,
  searchFriendsService,
  addFriendService,
  removeFriendService,
} from "../../utilities/friends-service";

const FriendsPage = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchFriends = useCallback(async () => {
    try {
      const fetchedFriends = await getAllFriendsService(userId);
      console.log(fetchedFriends);
      setFriends(fetchedFriends.friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleSearch = async () => {
    try {
      const results = await searchFriendsService(searchTerm);
      const filteredResults = results.filter(
        (result) =>
          !friends.some((friend) => friend.username === result.username)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleAddFriend = async (username) => {
    try {
      await addFriendService(username);
      fetchFriends(); // Fetch friends again to update the list
      setSearchTerm("");
      setSearchResults(
        searchResults.filter((user) => user.username !== username)
      );
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
  };

  const handleRemoveFriend = async (username) => {
    try {
      await removeFriendService(username);
      setFriends(friends.filter((friend) => friend.username !== username));
    } catch (error) {
      console.error("Failed to remove friend:", error);
    }
  };

  return (
    <div className="app-container py-4 px-10">
      <div className="search-bar flex flex-row my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your friends here..."
          className="text-black border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-acccol text-white font-bold px-4 ml-3 rounded"
        >
          SEARCH
        </button>
      </div>
      <h2 className="my-4 font-bold">Pending Friends to be added :</h2>
      <div className="results mt-4">
        {searchResults.map((searchResult) => (
          <div
            key={searchResult._id}
            className="flex justify-between items-center bg-seccol text-pricol text-lg rounded-lg p-2 my-2"
          >
            <span>{searchResult.username.toUpperCase()}</span>
            <button
              onClick={() => handleAddFriend(searchResult.username)}
              className="bg-green-500 text-white text-sm p-2 rounded-lg"
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
      <h2 className="my-4 font-bold">My Friends :</h2>
      <div className="friends-list">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="flex justify-between items-center bg-acccol text-white text-lg rounded-lg p-2 my-2"
          >
            <span>{friend.username.toUpperCase()}</span>
            <button
              onClick={() => handleRemoveFriend(friend.username)}
              className="bg-red-500 text-white text-sm p-2 rounded-lg"
            >
              Remove Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
