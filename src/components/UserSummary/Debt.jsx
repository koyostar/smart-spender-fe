import DebtChart from "../Charts/DebtChart";
import DebtStats from "../Statistics/Debt";
import SummaryTabs from "../Tabs/SummaryTabs";
import { getUser } from "../../utilities/users-service";

export default function Debt() {
  const user = getUser().username;

  return (
    <div className="tabs-container">
      <SummaryTabs />
      <div className="statistics">
        <h2>Hi {user.toUpperCase()}</h2>
        <DebtChart />
        <DebtStats />
      </div>
    </div>
  );
}
