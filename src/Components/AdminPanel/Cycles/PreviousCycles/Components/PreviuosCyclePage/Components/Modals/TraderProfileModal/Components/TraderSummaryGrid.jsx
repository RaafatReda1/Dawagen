import React from "react";
import styles from "./TraderSummaryGrid.module.css";

const TraderSummaryGrid = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي الكميات / الحجم</span>
        <strong className={styles.val}>DATA HERE!</strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي التعاملات</span>
        <strong className={styles.val}>DATA HERE!</strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>إجمالي المدفوع</span>
        <strong className={`${styles.val} ${styles.green}`}>
          DATA HERE!
        </strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>المتبقي / المديونية</span>
        <strong className={`${styles.val} ${styles.green}`}>
          DATA HERE!
        </strong>
      </div>
    </div>
  );
};

export default TraderSummaryGrid;
