import { useEffect, useState } from "react";
import { fetchStatsService } from "../../utilities/statistics-service";
import { findUsersByID } from "../../utilities/users-api";

const Statistics = () => {
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
        stats.sharedExpenseStats &&
        stats.sharedExpenseStats.usersThatOwes &&
        stats.sharedExpenseStats.usersThatOwes.length > 0
      ) {
        const userIds = stats.sharedExpenseStats.usersThatOwes.map(
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

  const totalExpenses = stats ? stats.totalExpenses.totalExpenses : null;
  const numOfExpenses = stats ? stats.totalExpenses.numofExpenses : null;
  const totalSharedExpenses = stats
    ? stats.totalSharedExpenses.totalOwed
    : null;
  const totalUnpaidSharedExpenses = stats
    ? stats.unpaidSharedExpenses.totalUnpaid
    : null;
  const totalAmountToCollect = stats
    ? stats.sharedExpenseStats.totalAmountIsOwed
    : null;

  const UserOwesList = ({ usersThatOwes, userDetails }) => (
    <div>
      <ul>
        {usersThatOwes.map((item, index) => (
          <li key={index}>
            User: {userDetails[item.user]}, Amount Owed: {item.amountOwed}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      {statsLoading && <p>Loading...</p>}
      {stats && (
        <div>
          <h2>Total Expenses: {totalExpenses}</h2>
          <p>Number of Expenses: {numOfExpenses}</p>
          <h2>Total Shared Expenses: {totalSharedExpenses}</h2>
          <h2>Unpaid Shared Expenses: {totalUnpaidSharedExpenses}</h2>
          <h2>Total Amount To Collect: {totalAmountToCollect}</h2>
          {stats.sharedExpenseStats.usersThatOwes &&
            stats.sharedExpenseStats.usersThatOwes.length > 0 && (
              <div>
                <h2>Users That Owe:</h2>
                <UserOwesList
                  usersThatOwes={stats.sharedExpenseStats.usersThatOwes}
                  userDetails={userDetails}
                />
              </div>
            )}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
export default Statistics;
