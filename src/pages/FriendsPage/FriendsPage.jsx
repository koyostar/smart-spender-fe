import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const fetchedFriends = await getAllFriendsService(userId);
        console.log(fetchedFriends);
        setFriends(fetchedFriends.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [userId]);

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
      const addedFriend = await addFriendService(username);
      setSearchTerm("");
      setFriends([...friends, addedFriend]);
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
    <div className="friends-container font-bebas mx-auto px-4">
      <div className="search-bar my-4 p-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your friends here..."
          className="text-black border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 mt-3 rounded"
        >
          Search
        </button>
      </div>
      <h2 className="my-4 font-bold">Pending Friends to be added :</h2>
      <div className="results mt-4">
        {searchResults.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center bg-[#57ABD8] p-2 my-2"
          >
            <span>{user.username}</span>
            <button
              onClick={() => handleAddFriend(user.username)}
              className="bg-green-500 text-white p-2 rounded"
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
            className="flex justify-between items-center bg-[#57ABD8] p-2 my-2"
          >
            <span>{friend.username}</span>
            <button
              onClick={() => handleRemoveFriend(friend.username)}
              className="bg-red-500 text-white p-2 rounded"
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
