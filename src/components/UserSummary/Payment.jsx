import PaymentChart from "../Charts/PaymentChart";
import PaymentStats from "../Statistics/Payment";
import SummaryTabs from "../Tabs/SummaryTabs";
import { getUser } from "../../utilities/users-service";

export default function Payment() {
  const user = getUser().username;

  return (
    <div className="tabs-container">
      <SummaryTabs />
      <div className="statistics">
        <h2>Hi {user.toUpperCase()}</h2>
        <PaymentChart />
        <PaymentStats />
      </div>
    </div>
  );
}
