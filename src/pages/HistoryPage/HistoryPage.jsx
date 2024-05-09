import { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../../utilities/users-service";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const user = getUser();
        if (!user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/expenses/find/user/${user._id}`);
        setExpenses(response.data.expenses);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="history-container font-bebas">
      <h1>Expense Incurred</h1>
      <div className="overflow-x-auto">
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
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{new Date(expense.incurredDate).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
