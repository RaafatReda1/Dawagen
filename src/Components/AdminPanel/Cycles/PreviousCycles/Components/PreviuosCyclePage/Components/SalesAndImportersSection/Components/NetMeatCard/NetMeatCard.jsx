import React from "react";
import { Scale } from "lucide-react";
import styles from "./NetMeatCard.module.css";

const NetMeatCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Scale size={18} className={styles.icon} />
          <span>صافي لحم الدورة طلّعته</span>
        </div>
        <span className={styles.badge}>تصافي DATA HERE!</span>
      </div>
      <div className={styles.heroBlock}>
        <div className={styles.weightRow}>
          <span className={styles.tons}>DATA HERE!</span>
          <span className={styles.unit}>طن</span>
        </div>
        <div className={styles.exactSub}>(DATA HERE! كجم صافي معتمد)</div>
      </div>
      <div className={styles.equation}>
        <div className={styles.step}>
          <span className={styles.stepLabel}>إجمالي القائم</span>
          <span className={styles.stepVal}>DATA HERE!</span>
        </div>
        <span className={styles.op}>−</span>
        <div className={styles.step}>
          <span className={styles.stepLabel}>فوارغ الأقفاص</span>
          <span className={styles.tareVal}>DATA HERE!</span>
        </div>
        <span className={styles.op}>=</span>
        <div className={`${styles.step} ${styles.stepResult}`}>
          <span className={styles.stepLabel}>صافي اللحم</span>
          <span className={styles.netVal}>DATA HERE!</span>
        </div>
      </div>
    </div>
  );
};

export default NetMeatCard;
