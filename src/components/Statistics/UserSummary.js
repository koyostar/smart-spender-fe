import { useEffect, useState } from "react";
import { fetchStatsService } from "../../utilities/statistics-service";

const UserSummaryStats = () => {
  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

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

  const totalExpenses = stats ? stats.totalExpenses.totalExpenses : null;
  const totalUnpaidSharedExpenses = stats
    ? stats.unpaidSharedExpenses.totalUnpaid
    : null;
  const totalAmountToCollect = stats
    ? stats.sharedExpenseStats.totalAmountIsOwed
    : null;

  return (
    <div className="stats-table">
      {statsLoading && <p>Loading...</p>}
      {stats && (
        <table>
          <tbody>
            <tr>
              <th>
                Total Expenses<span>:</span>
              </th>
              <td>{totalExpenses}</td>
            </tr>
            <tr>
              <th>
                Unpaid Shared Expenses<span>:</span>
              </th>
              <td>{totalUnpaidSharedExpenses}</td>
            </tr>
            <tr>
              <th>
                Total Amount To Collect<span>:</span>
              </th>
              <td>{totalAmountToCollect}</td>
            </tr>
          </tbody>
        </table>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
export default UserSummaryStats;
