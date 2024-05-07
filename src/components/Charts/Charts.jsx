import Statistics from "../Statistics/Statistics";
import { BarChart } from "@mui/x-charts/BarChart";
import { AxisConfig } from "@mui/x-charts";
import { useEffect, useState } from "react";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, -9800, 3908, 4800, -3800, 4300];

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
export default function Charts() {
  const [statisticsData, setStatisticsData] = useState(null);

  // Call the Statistics component and pass a callback function to handle data fetching
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        layout="horizontal"
        series={[
          {
            data: pData,
            label: "pv",
          },
          {
            data: uData,
            label: "uv",
          },
        ]}
        yAxis={[
          {
            data: xLabels,
            scaleType: "band",
          },
        ]}
        xAxis={[{ max: 10000 }]}
      />

      <Statistics onDataFetch={setStatisticsData} />
    </div>
  );
}
