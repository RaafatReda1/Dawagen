import React from "react";
import { TrendingUp } from "lucide-react";
import styles from "./ExecutionPriceCard.module.css";

const ExecutionPriceCard = () => {
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
          <span className={styles.priceVal}>DATA HERE!</span>
          <span className={styles.unit}>ج.م / كجم</span>
        </div>
        <div className={styles.subtitle}>مبني على إجمالي الأوزان والمبيعات</div>
      </div>
      <div className={styles.collectionBar}>
        <div className={styles.progressRow}>
          <span>التحصيل:</span>
          <strong>DATA HERE!</strong>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: "50%" }} />
        </div>
      </div>
    </div>
  );
};

export default ExecutionPriceCard;
