import React from "react";
import { DollarSign } from "lucide-react";
import styles from "./SalesHeroCard.module.css";

const SalesHeroCard = () => (
  <div className={styles.card} style={{ height: "100%" }}>
    <div className={styles.topRow}>
      <div className={styles.titleGroup}>
        <DollarSign size={16} className={styles.icon} />
        <span>إجمالي مبيعات الدورة</span>
      </div>
      <span className={styles.badge}>Hero Card 🌟</span>
    </div>
    <div className={styles.values}>
      <div className={styles.bigAmount}>DATA HERE!</div>
      <div className={styles.exactText}>DATA HERE!</div>
    </div>
    <div className={styles.footer}>
      <div className={styles.detailRow}>
        <span>المحصل نقداً:</span>
        <span className={styles.collectedVal}>DATA HERE!</span>
      </div>
      <div className={styles.receivableRow}>
        <span>آجل للتجار:</span>
        <span className={styles.debtVal}>DATA HERE!</span>
      </div>
    </div>
  </div>
);

export default SalesHeroCard;
