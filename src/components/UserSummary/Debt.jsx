import DebtChart from "../Charts/DebtChart";
import DebtStats from "../Statistics/Debt";
import SummaryTabs from "../Tabs/SummaryTabs";

export default function Debt() {
  return (
    <div className="statistics-container">
      <SummaryTabs />
      <DebtChart />
      <DebtStats />
    </div>
  );
}
