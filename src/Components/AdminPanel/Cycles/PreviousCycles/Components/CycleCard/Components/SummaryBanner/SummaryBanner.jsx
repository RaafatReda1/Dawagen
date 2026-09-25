import React from "react";
import { CircleDollarSign, Receipt } from "lucide-react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./SummaryBanner.module.css";

const SummaryBanner = ({ totalRevenue, totalExpenses, netProfitLoss }) => {
  const isProfit = netProfitLoss >= 0;
  const formattedNet = formatEgp(netProfitLoss, { showSign: true });

  return (
    <div className={styles.banner}>
      <div className={styles.donutWrapper}>
        <svg className={styles.donutSvg} viewBox="0 0 80 80">
          <circle className={styles.donutBg} cx="40" cy="40" r="34" />
          <circle className={styles.donutFill} cx="40" cy="40" r="34" style={{ strokeDashoffset: isProfit ? "50" : "150", stroke: isProfit ? "#34D399" : "#F87171" }} />
        </svg>
        <div className={styles.donutContent}>
          <div className={styles.donutLabel}>صافي النتيجة</div>
          <div className={styles.donutValue} style={{ color: isProfit ? "#6EE7B7" : "#FCA5A5" }}>{formattedNet}</div>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.iconCircle} style={{ background: "rgba(52, 211, 153, 0.25)", color: "#6EE7B7" }}><CircleDollarSign size={20} /></div>
        <span className={styles.statLabel}>إجمالي الإيرادات</span>
        <span className={styles.statValue}>{formatEgp(totalRevenue)}</span>
      </div>
      <div className={styles.statBox}>
        <div className={styles.iconCircle} style={{ background: "rgba(248, 113, 113, 0.25)", color: "#FCA5A5" }}><Receipt size={20} /></div>
        <span className={styles.statLabel}>إجمالي المصروفات</span>
        <span className={styles.statValue}>{formatEgp(totalExpenses)}</span>
      </div>
    </div>
  );
};

export default SummaryBanner;
