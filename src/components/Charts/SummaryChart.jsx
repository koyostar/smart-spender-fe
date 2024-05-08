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

  const totalAmountReceived = stats
    ? stats.userExpensesPaid && stats.userExpensesPaid.userExpensesPaid
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

  const summaryStatsLabel = ["Loans", "Debts", "Expenses"];

  const valueFormatter = (value) => `$${value}`;

  return (
    <div className="summary-chart px-5">
      <BarChart
        width={450}
        height={250}
        layout="horizontal"
        grid={{ vertical: true }}
        series={[
          {
            data: summaryStatsData,
            color: "#57abd8",
            valueFormatter,
          },
        ]}
        yAxis={[
          {
            data: summaryStatsLabel,
            scaleType: "band",
            categoryGapRatio: 0.3,
          },
        ]}
        leftAxis={{
          tickLabelStyle: {
            textAnchor: "end",
            fontSize: 12,
            fill: "white",
            fontWeight: "bold",
          },
        }}
        bottomAxis={{
          tickLabelStyle: {
            textAnchor: "middle",
            fontSize: 12,
            fill: "white",
          },
        }}
        margin={{ left: 80, right: 70, top: 0 }}
      />
    </div>
  );
}
