import React, { useEffect, useState } from "react";
import { getUser } from "../../utilities/users-service";
import { getAllFriendsService } from "../../utilities/friends-service";
import { v4 as uuidv4 } from "uuid";

export default function SharedWith(props) {
  const {sharedAmt, setSharedAmt, sharedExpenses, setSharedExpenses, expenseDetails, setExpenseDetails} = props;
  const [user, setUser] = useState(getUser());
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const fetchedFriends = await getAllFriendsService(user._id);
        setFriendList(fetchedFriends.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [user]);

  const handleChangeInput = (id, event) => {
    const newFriendFields = sharedExpenses.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setSharedExpenses(newFriendFields);
    const totalSharedAmt = sumSharedAmt(sharedExpenses);
    const roundedSharedAmt = (Math.round((totalSharedAmt * 100)) / 100);
    setSharedAmt(roundedSharedAmt);
    setExpenseDetails({...expenseDetails, sharedExpenses: newFriendFields})
  }

  const handleAddFields = () => {
    setSharedExpenses([...sharedExpenses, { id: uuidv4(),  friend: '', amount: 0 }])
  }

  const handleRemoveFields = id => {
    const values  = [...sharedExpenses];
    values.splice(values.findIndex(value => value.id === id), 1);
    setSharedExpenses(values);
  }

  function sumSharedAmt(fields) {
    const amountsArr = [];

    fields.forEach(field => {
      if (!field.amount) {
        field.amount = 0;
      } else if (field.amount > 0 && /^0+/.test(field.amount)) {
        field.amount = field.amount.toString().replace(/^0+/, "");
      }
      const amountNumber = parseFloat(field.amount);
      amountsArr.push(amountNumber);
    });

    return amountsArr.reduce((acc, amount) => {
      return acc + amount
    }, 0)
  }

  return (
    <>
      {sharedExpenses.map((sharedExpense) => (
        <div key={sharedExpense.id}>
          <select
            name="friend"
            onChange={(event) => handleChangeInput(sharedExpense.id, event)}
          >
            <option key="00">Select a friend</option>
            {friendList.map((option) => (
              <option value={option._id} key={option._id}>{option.username}</option>
            ))}
          </select>
          &nbsp; &nbsp;
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={sharedExpense.amount}
            onChange={(event) => handleChangeInput(sharedExpense.id, event)}
          />
          &nbsp; &nbsp;
          <button onClick={handleAddFields}>+</button>
          &nbsp; &nbsp;
          <button disabled={sharedExpenses.length === 1} onClick={() => handleRemoveFields(sharedExpense.id)}>-</button>
        </div>
      ))}
      <div>Shared amount: {sharedAmt}</div>
    </>
  );
}
