import React, { useEffect, useState } from "react";
import * as usersAPI from "../../utilities/users-api";

export default function SharedWith(props) {
  const { friends } = props;
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");
  const [sharedAmount, setSharedAmount] = useState(0)

  useEffect(() => {
    // console.log(friends)
    const fetchUsers = async () => {
      const users = await usersAPI.findUsers();
      setUserList(users);
    };
    fetchUsers();
  }, []);

  const getFriends = (count) => {
    console.log(count);
    let numberOfFriends = [];
    for (let i = 0; i < count; i++) {
      numberOfFriends.push(
        <>
          <label>Friend</label>
          <select key={i}>
            {userList.map((option) => (
              <option value={user} onChange={(e) => setUser(e.target.value)}>{option.username}</option>
            ))}
          </select>
          <label>Amount</label>
          <input type="number" key={i} value={sharedAmount} onChange={(e) => setSharedAmount(e.target.value)}></input>
          {/* <label>%</label>
          <input type="number" key={i}></input> */}
          <br />
        </>
      );
    }
    return numberOfFriends;
  };

  return (
    <>
      {getFriends(friends)}
    </>
  );
}
