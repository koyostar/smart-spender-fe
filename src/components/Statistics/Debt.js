import { useEffect, useState } from "react";
import { fetchStatsService } from "../../utilities/statistics-service";
import { findUsersByID } from "../../utilities/users-api";

const DebtStats = () => {
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsArray, setUserDetailsArray] = useState([]);

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

            userDetailsMap[userId] = userDetails.user.username.toUpperCase();
          } catch (error) {
            console.error("Error fetching user details:", error);
            userDetailsMap[userId] = null;
          }
        }
        console.log("User details map:", userDetailsMap); // Log user details map

        setUserDetails(userDetailsMap);

        if (stats.userExpensesOwed.usersThatOwes.length > 0) {
          const userDetailsArray = stats.userExpensesOwed.usersThatOwes.map(
            (item) => ({
              expenseId: item.expenseId,
              username: userDetailsMap[item.user],
              amountOwed: item.amountOwed,
            })
          );
          setUserDetailsArray(userDetailsArray);

          console.log("User details array:", userDetailsArray); // Log user details array
        }
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

  return (
    <div className="stats-table">
      {statsLoading && <p>Loading...</p>}
      {stats && (
        <table>
          <tbody>
            <tr>
              <th>Debts Paid &nbsp;:</th>
              <td>{totalPaidSharedExpenses}</td>
            </tr>
            <tr>
              <th>Debts To Collect &nbsp;:</th>
              <td>{totalAmountToCollect}</td>
            </tr>
            {userDetailsArray.map((userDetail, index) => (
              <tr key={index}>
                <ul>
                  <li className="list-inside	list-disc	ps-10	">
                    Expense ID {userDetail.expenseId}: &emsp;
                    {userDetail.username} owes you{" "}
                    <span className="bg-acccol text-pricol font-bold px-2 text-xl">
                      ${userDetail.amountOwed}
                    </span>
                  </li>
                </ul>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
export default DebtStats;
