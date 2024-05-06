import { useEffect, useState } from "react";
import {
  getFriendAPI,
  addFriendAPI,
  deleteFriendAPI,
} from "../../utilities/friends-api";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      if (searchTerm) {
        try {
          const data = await getFriendAPI(searchTerm);
          setFriends(data.user || []);
        } catch (error) {
          console.error("Failed to fetch friends:", error);
          setFriends([]);
        }
      }
    };
    fetchFriends();
  }, [searchTerm]);

  const handleAddFriend = async (username) => {
    try {
      await addFriendAPI(username);
      console.log("Friend added successfully!");
      setFriends((prev) => [...prev, { username, _id: Date.now() }]);
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
  };

  const handleDeleteFriend = async (username) => {
    try {
      await deleteFriendAPI(username);
      console.log("Friend removed successfully!");
      setFriends((prev) =>
        prev.filter((friend) => friend.username !== username)
      );
    } catch (error) {
      console.error("Failed to remove friend:", error);
    }
  };

  return (
    <div className="max-w-screen">
      <div className="px-6 relative">
        <header className="mx-6 px-6 font-inter font-thin text-2xl">
          My Friends
        </header>
        <input
          type="text"
          placeholder="Search Friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 text-black"
        />
        <div className="grid grid-cols-3 p-6 m-2">
          {friends.length === 0 ? (
            <p className="mx-4 font-inter font-thin text-xl">
              No friends found
            </p>
          ) : (
            friends.map((friend) => (
              <div key={friend._id} className="p-2">
                {friend.username}
                <button onClick={() => handleAddFriend(friend.username)}>
                  Add
                </button>
                <button onClick={() => handleDeleteFriend(friend.username)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;
