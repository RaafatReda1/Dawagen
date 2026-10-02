import React from "react";
import styles from "./TraderSummaryGrid.module.css";

const TraderSummaryGrid = ({ stats }) => {
  const { totalQtyText, totalVal, totalPaid, remaining } = stats;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي الكميات / الحجم</span>
        <strong className={styles.val}>{totalQtyText}</strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي التعاملات</span>
        <strong className={styles.val}>{totalVal.toLocaleString()} EGP</strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي المدفوع</span>
        <strong className={`${styles.val} ${styles.green}`}>
          {totalPaid.toLocaleString()} EGP
        </strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>المتبقي / المديونية</span>
        <strong className={`${styles.val} ${remaining > 0 ? styles.red : styles.green}`}>
          {remaining.toLocaleString()} EGP
        </strong>
      </div>
    </div>
  );
};

export default TraderSummaryGrid;
