import React from "react";
import styles from "./FinancialRatioFooter.module.css";

const FinancialRatioFooter = () => (
  <div className={styles.footerBar}>
    <div className={styles.track}>
      <div className={styles.salesFill} style={{ width: "50%" }} title="نسبة المبيعات" />
      <div className={styles.expensesFill} style={{ width: "50%" }} title="نسبة المصروفات" />
    </div>
    <div className={styles.footnote}>
      <span>نسبة المبيعات للتكاليف: <strong>DATA HERE!</strong></span>
      <span>أرباح تشغيلية ممتازة للدورة ✅</span>
    </div>
  </div>
);

export default FinancialRatioFooter;
