import { Receipt, CheckCircle2, AlertCircle, Syringe } from "lucide-react";
import { useDrugs } from "../../Contexts/DrugsContext";
import DrugStatCard from "./Components/DrugStatCard/DrugStatCard";
import styles from "./DrugsOverview.module.css";

const DrugsOverview = () => {
  const { metrics } = useDrugs();

  const cards = [
    { label: "إجمالي فواتير الأدوية", value: `${metrics.totalCost?.toLocaleString()} ج.م`, icon: <Receipt size={20} className={styles.blueIcon} />, badge: `${metrics.invoicesCount} فواتير مسجلة` },
    { label: "المسدد للشركات والموردين", value: `${metrics.totalPaid?.toLocaleString()} ج.م`, icon: <CheckCircle2 size={20} className={styles.greenIcon} />, badge: "مدفوع نقداً أو إلكترونياً" },
    { label: "المتبقي للموردين (الآجل)", value: `${metrics.remainingDebt?.toLocaleString()} ج.م`, icon: <AlertCircle size={20} className={styles.amberIcon} />, badge: metrics.remainingDebt > 0 ? "مستحق السداد" : "خالص بالكامل" },
    { label: "إجمالي الجرعات والسحوبات", value: metrics.withdrawalsCount?.toLocaleString(), unit: "عملية سحب", icon: <Syringe size={20} className={styles.tealIcon} />, badge: "محصنات وأدوية علاجية" },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => (
        <DrugStatCard key={i} {...c} />
      ))}
    </div>
  );
};

export default DrugsOverview;
