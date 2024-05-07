import { BarChart } from "@mui/x-charts/BarChart";
import { AxisConfig } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { fetchStatsService } from "../../utilities/statistics-service";

export default function SummaryChart() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await fetchStatsService();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
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

  const summaryStatsData = [
    totalExpenses,
    totalUnpaidSharedExpenses,
    totalAmountToCollect,
  ];

  const summaryStatsLabel = [
    "Total Expenses",
    "Unpaid Shared Expenses",
    "Total Amount To Collect",
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
