import { Calculator } from "lucide-react";
import styles from "./CycleSummary.module.css";

const CycleSummary = ({ numberOfChicks, chickPrice }) => {
  const count = Number(numberOfChicks) || 0;
  const price = Number(chickPrice) || 0;
  const totalCost = count * price;

  return (
    <div className={styles.summaryCard}>
      <div className={styles.leftInfo}>
        <div className={styles.iconWrap}>
          <Calculator size={20} />
        </div>
        <div className={styles.labels}>
          <span className={styles.title}>إجمالي تكلفة شراء الكتاكيت التقديرية</span>
          <span className={styles.statsText}>
            {count > 0 ? `${count.toLocaleString("ar-EG")} كتكوت` : "أدخل عدد الكتاكيت"}
          </span>
        </div>
      </div>
      <div className={styles.totalAmount}>
        {totalCost.toLocaleString("ar-EG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        <span className={styles.currency}> ج.م</span>
      </div>
    </div>
  );
};

export default CycleSummary;
