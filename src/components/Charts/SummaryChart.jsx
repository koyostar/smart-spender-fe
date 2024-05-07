import { BarChart } from "@mui/x-charts/BarChart";
import { AxisConfig } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { fetchStatsService } from "../../utilities/statistics-service";
import { findUsersByID } from "../../utilities/users-api";

export default function SummaryChart() {
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
        stats.sharedExpenseOwed &&
        stats.sharedExpenseOwed.usersThatOwes &&
        stats.sharedExpenseOwed.usersThatOwes.length > 0
      ) {
        const userIds = stats.sharedExpenseOwed.usersThatOwes.map(
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
    ? stats.sharedExpenseOwed && stats.sharedExpenseOwed.totalAmountIsOwed
    : null;

  const totalAmountReceived = stats
    ? stats.sharedExpensePaid && stats.sharedExpensePaid.totalAmountIsPaid
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

  const summaryStatsData = [
    totalUnpaidSharedExpenses,
    totalAmountToCollect,
    totalExpenses,
  ];

  const summaryStatsLabel = [
    "Unpaid Shared Expenses",
    "Total Amount To Collect",
    "Total Expenses",
  ];

  const valueFormatter = (value) => `$${value}`;

  return (
    <div className="summary-chart">
      <BarChart
        width={450}
        height={300}
        layout="horizontal"
        grid={{ vertical: true }}
        series={[
          {
            data: summaryStatsData,
            color: "#57abd8",
            fill: "white",
            valueFormatter,
          },
        ]}
        yAxis={[
          {
            data: summaryStatsLabel,
            scaleType: "band",
            fill: "white",
            categoryGapRatio: 0.3,
          },
        ]}
        leftAxis={null}
        bottomAxis={{
          tickLabelStyle: {
            textAnchor: "middle",
            fontSize: 12,
            fill: "white",
          },
        }}
        margin={{ left: 10, right: 50 }}
      />
    </div>
  );
}
