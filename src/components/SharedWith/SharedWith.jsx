import React, { useEffect, useState } from "react";
import * as usersAPI from "../../utilities/users-api";
import { v4 as uuidv4 } from "uuid";

export default function SharedWith() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");

  const [friendFields, setFriendFields] = useState([
    { id: uuidv4(), friend: "", amount: 0 },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersAPI.findUsers();
      setUserList(users);
    };
    fetchUsers();
  }, []);

  const handleChangeInput = (id, event) => {
    const newFriendFields = friendFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setFriendFields(newFriendFields);
  }

  const handleAddFields = () => {
    setFriendFields([...friendFields, { id: uuidv4(),  friend: '', amount: 0 }])
  }

  const handleRemoveFields = id => {
    const values  = [...friendFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setFriendFields(values);
  }


  return (
    <>
      {friendFields.map((friendField) => (
        <div key={friendField.id}>
          <select
            name="friend"
            value={friendField.friend}
            onChange={(event) => handleChangeInput(friendField.id, event)}
          >
            {userList.map((option) => (
              <option>{option.username}</option>
            ))}
          </select>
          &nbsp; &nbsp;
          <input
            name="amount"
            placeholder="Amount"
            value={friendField.amount}
            onChange={(event) => handleChangeInput(friendField.id, event)}
          />
          &nbsp; &nbsp;
          <button onClick={handleAddFields}>+</button>
          &nbsp; &nbsp;
          <button disabled={friendFields.length === 1} onClick={() => handleRemoveFields(friendField.id)}>-</button>
        </div>
      ))}
    </>
  );
}
