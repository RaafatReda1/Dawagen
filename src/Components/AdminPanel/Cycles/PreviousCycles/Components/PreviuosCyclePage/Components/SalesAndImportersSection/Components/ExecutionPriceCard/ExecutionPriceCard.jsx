import React from "react";
import { TrendingUp } from "lucide-react";
import styles from "./ExecutionPriceCard.module.css";

const ExecutionPriceCard = ({ avgPrice = 0, revenue = 0, collected = 0 }) => {
  const collectionPct = revenue > 0 ? Math.min(100, Math.round((collected / revenue) * 100)) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <TrendingUp size={18} className={styles.icon} />
          <span>متوسط سعر الكيلو والتنفيذ</span>
        </div>
        <span className={styles.badge}>السعر الفعلي</span>
      </div>
      <div className={styles.heroBlock}>
        <div className={styles.priceRow}>
          <span className={styles.priceVal}>{avgPrice}</span>
          <span className={styles.unit}>ج.م / كجم</span>
        </div>
        <div className={styles.subtitle}>مبني على إجمالي الأوزان والمبيعات</div>
      </div>
      <div className={styles.collectionBar}>
        <div className={styles.progressRow}>
          <span>التحصيل:</span>
          <strong>{revenue > 0 ? `${collectionPct}% نقدياً` : "—"}</strong>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${collectionPct}%` }} />
        </div>
      </div>
    </div>
  );
};

export default ExecutionPriceCard;
