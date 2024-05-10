import { useEffect, useState } from "react";
import { fetchStatsService } from "../../utilities/statistics-service";
import { findUsersByID } from "../../utilities/users-api";

const PaymentStats = () => {
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setStatsLoading(true);
      try {
        const statsData = await fetchStatsService();
        setStats(statsData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserDetailsForStats = async () => {
      if (
        stats &&
        stats.userExpensesOwed &&
        stats.userExpensesOwed.usersThatOwes &&
        stats.userExpensesOwed.usersThatOwes.length > 0
      ) {
        const userIds = stats.userExpensesOwed.usersThatOwes.map(
          (item) => item.user
        );
        console.log("User IDs:", userIds); // Log user IDs

        const userDetailsMap = {};
        for (const userId of userIds) {
          try {
            const userDetails = await findUsersByID(userId);
            console.log("User details for", userId, ":", userDetails); // Log user details

            userDetailsMap[userId] = userDetails.user.username;
          } catch (error) {
            console.error("Error fetching user details:", error);
            userDetailsMap[userId] = null;
          }
        }
        console.log("User details map:", userDetailsMap); // Log user details map

        setUserDetails(userDetailsMap);
      }
    };

    fetchUserDetailsForStats();
  }, [stats]);

  const expensesCreated = stats ? stats.expensesCreated.expensesCreated : null;

  const totalSharedExpenses = stats
    ? stats.totalSharedExpenses.totalOwed
    : null;
  const totalUnpaidSharedExpenses = stats
    ? stats.unpaidSharedExpenses.totalUnpaid
    : null;
  const totalPaidSharedExpenses = stats
    ? stats.paidSharedExpenses.totalPaid
    : null;
  const totalAmountToCollect = stats
    ? stats.userExpensesOwed && stats.userExpensesOwed.userExpensesOwed
    : null;
  const totalExpenses = stats ? stats.totalExpenses : null;

  const UserOwesList = ({ usersThatOwes, userDetails }) => (
    <div>
      <ul>
        {usersThatOwes.map((item, index) => (
          <li key={index}>
            {userDetails[item.user]} owed you {item.amountOwed}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="stats-table">
      {statsLoading && <p>Loading...</p>}
      {stats && (
        <table>
          <tbody>
            <tr>
              <th>Expenses Paid by Others &nbsp;:</th>
              <td>{totalSharedExpenses}</td>
            </tr>
            <tr>
              <th>Amount Returned &nbsp;:</th>
              <td>{totalPaidSharedExpenses}</td>
            </tr>
            <tr>
              <th>Amount Owed &nbsp;:</th>
              <td>{totalUnpaidSharedExpenses}</td>
            </tr>
          </tbody>
        </table>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
export default PaymentStats;
