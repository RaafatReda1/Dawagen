import React from "react";
import { Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatEgp } from "../../../../../../../../../../utils/formatters";
import styles from "./FinancialHeroHeader.module.css";

const FinancialHeroHeader = ({ isProfit = true, netProfit = 0, margin = "0" }) => (
  <div className={styles.headerBar}>
    <div className={styles.titleGroup}>
      <span className={styles.badge}>
        <Sparkles size={14} /> بطل القسم المالي
      </span>
      <h3 className={styles.heading}>الموقف المالي والأرباح</h3>
    </div>
    <div className={`${styles.profitBadge} ${isProfit ? styles.profitSuccess : styles.profitLoss}`}>
      {isProfit ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
      <span>
        {isProfit ? "صافي ربح:" : "عجز:"}{" "}
        <strong>{formatEgp(Math.abs(netProfit))}</strong>
        <small className={styles.marginText}>({isProfit ? "+" : "-"}{Math.abs(margin)}%)</small>
      </span>
    </div>
  </div>
);

export default FinancialHeroHeader;
