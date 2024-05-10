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
    <div className="tabless-container">
      <div className="search-bar flex flex-row my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your friends here..."
          className="input bg-lightpri text-lightsec border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-darkpri text-lightacc font-bold px-4 ml-3 rounded-lg"
        >
          SEARCH
        </button>
      </div>
      <h2 className="my-4 font-bold">Pending Friends to be added :</h2>
      <div className="results mt-4">
        {searchResults.map((searchResult) => (
          <div
            key={searchResult._id}
            className="flex justify-between items-center bg-darksec text-lightpri text-lg rounded-lg p-2 my-2"
          >
            <span>{searchResult.username.toUpperCase()}</span>
            <button
              onClick={() => handleAddFriend(searchResult.username)}
              className="bg-lightpri text-darkpri shadow- text-sm p-2 rounded-lg"
            >
              ADD
            </button>
          </div>
        ))}
      </div>
      <h2 className="my-4 font-bold">My Friends :</h2>
      <div className="friends-list">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="flex justify-between items-center bg-lightpri text-darksec text-lg rounded-lg p-2 my-2"
          >
            <span>{friend.username.toUpperCase()}</span>
            <button
              onClick={() => handleRemoveFriend(friend.username)}
              className="bg-darkpri text-lightpri  text-sm p-2 rounded-lg"
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
