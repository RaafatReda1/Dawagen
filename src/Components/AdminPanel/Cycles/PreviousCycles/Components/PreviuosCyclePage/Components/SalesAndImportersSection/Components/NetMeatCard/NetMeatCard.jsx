import React from "react";
import { Scale } from "lucide-react";
import styles from "./NetMeatCard.module.css";

const NetMeatCard = ({ netKg = 0, grossKg = 0, tareKg = 0 }) => {
  const netTons = (netKg / 1000).toFixed(2);
  const grossTons = (grossKg / 1000).toFixed(2);
  const tareTons = (tareKg / 1000).toFixed(2);
  const yieldPct = grossKg > 0 ? ((netKg / grossKg) * 100).toFixed(1) : null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Scale size={18} className={styles.icon} />
          <span>صافي لحم الدورة طلّعته</span>
        </div>
        {yieldPct && <span className={styles.badge}>تصافي {yieldPct}%</span>}
      </div>
      <div className={styles.heroBlock}>
        <div className={styles.weightRow}>
          <span className={styles.tons}>{netTons}</span>
          <span className={styles.unit}>طن</span>
        </div>
        <div className={styles.exactSub}>({netKg.toLocaleString("ar-EG")} كجم صافي معتمد)</div>
      </div>
      <div className={styles.equation}>
        <div className={styles.step}>
          <span className={styles.stepLabel}>إجمالي القائم</span>
          <span className={styles.stepVal}>{grossKg > 0 ? `${grossTons} طن` : `${netTons} طن`}</span>
        </div>
        <span className={styles.op}>−</span>
        <div className={styles.step}>
          <span className={styles.stepLabel}>فوارغ الأقفاص</span>
          <span className={styles.tareVal}>{tareKg > 0 ? `${tareTons} طن` : "0 طن"}</span>
        </div>
        <span className={styles.op}>=</span>
        <div className={`${styles.step} ${styles.stepResult}`}>
          <span className={styles.stepLabel}>صافي اللحم</span>
          <span className={styles.netVal}>{netTons} طن</span>
        </div>
      </div>
    </div>
  );
};

export default NetMeatCard;
