import PaymentChart from "../Charts/PaymentChart";
import PaymentStats from "../Statistics/Payment";
import SummaryTabs from "../Tabs/SummaryTabs";

export default function Payment() {
  return (
    <div className="statistics-container font-bebas">
      <SummaryTabs />
      <PaymentChart />
      <PaymentStats />
    </div>
  );
}
