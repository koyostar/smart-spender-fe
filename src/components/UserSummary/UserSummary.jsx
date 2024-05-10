import SummaryChart from "../Charts/SummaryChart";
import UserSummaryStats from "../Statistics/UserSummary";
import SummaryTabs from "../Tabs/SummaryTabs";
import { getUser } from "../../utilities/users-service";

export default function UserSummary() {
  const user = getUser().username;

  return (
    <div className="tabs-container">
      <SummaryTabs />
      <div className="statistics">
        <h2>Hi {user.toUpperCase()}</h2>
        <SummaryChart />
        <UserSummaryStats />
      </div>
    </div>
  );
}
