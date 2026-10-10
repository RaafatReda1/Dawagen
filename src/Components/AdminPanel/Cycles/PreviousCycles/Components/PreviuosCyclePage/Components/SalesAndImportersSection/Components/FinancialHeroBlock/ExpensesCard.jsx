import React from "react";
import { Receipt } from "lucide-react";
import styles from "./ExpensesCard.module.css";

const ExpensesCard = () => (
  <div className={styles.card} style={{ height: "100%" }}>
    <div className={styles.topRow}>
      <div className={styles.titleGroup}>
        <Receipt size={16} className={styles.icon} />
        <span>تكاليف ومصروفات الدورة</span>
      </div>
      <span className={styles.ratioTag}>DATA HERE!</span>
    </div>
    <div className={styles.values}>
      <div className={styles.bigAmount}>DATA HERE!</div>
      <div className={styles.exactText}>DATA HERE!</div>
    </div>
    <div className={styles.footer}>
      <div className={styles.detailRow}>
        <span>تغطية الإيراد:</span>
        <span className={styles.coverGood}>DATA HERE!</span>
      </div>
      <div className={styles.detailRow}>
        <span>البنود:</span>
        <span className={styles.summaryVal}>علف + كتاكيت + أدوية</span>
      </div>
    </div>
  </div>
);

export default ExpensesCard;
