import SummaryMetricCard from "./Components/SummaryMetricCard/SummaryMetricCard";
import styles from "./SummaryMetricsBar.module.css";

const SummaryMetricsBar = ({ calculations }) => {
  const { tareTotal, grossTotal, netWeight, chicksTotal, avgBirdWeight, totalValue } = calculations;

  return (
    <div className={styles.bar}>
      <SummaryMetricCard title="إجمالي الفارغ" value={tareTotal.toLocaleString()} unit="كجم" />
      <SummaryMetricCard title="إجمالي القائم" value={grossTotal.toLocaleString()} unit="كجم" />
      <SummaryMetricCard title="صافي وزن الفراخ" value={netWeight.toLocaleString()} unit="كجم" color="highlight" />
      <SummaryMetricCard title="إجمالي عدد الفراخ" value={chicksTotal.toLocaleString()} unit="طائر" color="primary" />
      <SummaryMetricCard title="متوسط وزن الطائر" value={avgBirdWeight} unit="كجم/طائر" />
      <SummaryMetricCard title="إجمالي القيمة التقديرية" value={totalValue.toLocaleString()} unit="ج.م" />
    </div>
  );
};

export default SummaryMetricsBar;
