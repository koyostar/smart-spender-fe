import { useEffect, useState } from "react";
import { getUser } from "../../utilities/users-service";
import { findUserExpenses } from "../../utilities/expense-api";
import { findUserTransfers } from "../../utilities/transfer-api";

const HistoryPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getUser();
      if (!user) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      await fetchExpenses(user._id);
      await fetchTransfers(user._id);

      setLoading(false);
    };
    fetchUserData();
  }, []);

  const fetchExpenses = async (userId) => {
    try {
      const response = await findUserExpenses(userId);
      setExpenses(response.expenses);
    } catch (error) {
      console.error("Error fetching your expenses", error);
    }
  };

  const fetchTransfers = async (userId) => {
    try {
      const response = await findUserTransfers(userId);
      setTransfers(response.transfer);
    } catch (error) {
      console.error("Error fetching your transfers", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tabless-container">
      <h2>Expense History</h2>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Incurred Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              ? expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      {new Date(expense.incurredDate).toLocaleDateString()}
                    </td>
                    <td>{expense.category}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                  </tr>
                ))
              : "No expenses created"}
          </tbody>
        </table>
      </div>
      <br />
      <h2>Transfer History</h2>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Transfer Date</th>
              <th>Amount</th>
              <th>From</th>
              <th>To</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transfers
              ? transfers.map((transfer) => (
                  <tr key={transfer._id}>
                    <td>
                      {new Date(transfer.transferDate).toLocaleDateString()}
                    </td>
                    <td>{transfer.amount}</td>
                    <td>{transfer.from}</td>
                    <td>{transfer.to}</td>
                    <td>{transfer.description}</td>
                  </tr>
                ))
              : "No transfers done"}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HistoryPage;
