import React from "react";
import { Receipt } from "lucide-react";
import { formatEgp } from "../../../../../../../../../../utils/formatters";
import styles from "./ExpensesCard.module.css";

const ExpensesCard = ({ expenses = 0, coveragePct = "100", ratioText = "1x", heightPct = 100, isProfit = true }) => (
  <div className={styles.card} style={{ height: `${heightPct}%` }}>
    <div className={styles.topRow}>
      <div className={styles.titleGroup}>
        <Receipt size={16} className={styles.icon} />
        <span>تكاليف ومصروفات الدورة</span>
      </div>
      <span className={styles.ratioTag}>{ratioText}</span>
    </div>
    <div className={styles.values}>
      <div className={styles.bigAmount}>{formatEgp(expenses)}</div>
      <div className={styles.exactText}>{Math.round(expenses).toLocaleString("ar-EG")} ج.م تكلفة كاملة</div>
    </div>
    <div className={styles.footer}>
      <div className={styles.detailRow}>
        <span>تغطية الإيراد:</span>
        <span className={isProfit ? styles.coverGood : styles.coverBad}>{coveragePct}%</span>
      </div>
      <div className={styles.detailRow}>
        <span>البنود:</span>
        <span className={styles.summaryVal}>علف + كتاكيت + أدوية</span>
      </div>
    </div>
  </div>
);

export default ExpensesCard;
