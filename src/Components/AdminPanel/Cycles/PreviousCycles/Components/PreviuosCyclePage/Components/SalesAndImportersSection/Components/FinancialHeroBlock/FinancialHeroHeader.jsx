import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import styles from "./FinancialHeroHeader.module.css";

const FinancialHeroHeader = () => (
  <div className={styles.headerBar}>
    <div className={styles.titleGroup}>
      <span className={styles.badge}>
        <Sparkles size={14} /> بطل القسم المالي
      </span>
      <h3 className={styles.heading}>الموقف المالي والأرباح</h3>
    </div>
    <div className={`${styles.profitBadge} ${styles.profitSuccess}`}>
      <ArrowUpRight size={15} />
      <span>
        صافي ربح: <strong>DATA HERE!</strong>
      </span>
    </div>
  </div>
);

export default FinancialHeroHeader;
