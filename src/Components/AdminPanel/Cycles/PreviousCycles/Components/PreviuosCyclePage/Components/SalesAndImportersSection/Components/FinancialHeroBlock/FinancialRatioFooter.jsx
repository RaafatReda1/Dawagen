import React from "react";
import styles from "./FinancialRatioFooter.module.css";

const FinancialRatioFooter = ({ salesPct = 50, expensesPct = 50, ratioText = "1x", isProfit = true }) => (
  <div className={styles.footerBar}>
    <div className={styles.track}>
      <div className={styles.salesFill} style={{ width: `${salesPct}%` }} title="نسبة المبيعات" />
      <div className={styles.expensesFill} style={{ width: `${expensesPct}%` }} title="نسبة المصروفات" />
    </div>
    <div className={styles.footnote}>
      <span>نسبة المبيعات للتكاليف: <strong>{ratioText}</strong></span>
      <span>{isProfit ? "أرباح تشغيلية ممتازة للدورة ✅" : "عجز يتطلب المراجعة ⚠️"}</span>
    </div>
  </div>
);

export default FinancialRatioFooter;
