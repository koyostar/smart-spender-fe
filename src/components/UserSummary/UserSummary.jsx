import SummaryChart from "../Charts/SummaryChart";
import UserSummaryStats from "../Statistics/UserSummary";
import SummaryTabs from "../Tabs/SummaryTabs";

export default function UserSummary() {
  return (
    <div className="statistics-container font-bebas">
      <SummaryTabs />
      <SummaryChart />
      <UserSummaryStats />
    </div>
  );
}
