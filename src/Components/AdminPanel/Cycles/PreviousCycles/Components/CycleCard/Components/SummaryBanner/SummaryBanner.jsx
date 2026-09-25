import React from "react";
import { CircleDollarSign, Receipt } from "lucide-react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./SummaryBanner.module.css";

const formatDonutNumber = (num) => {
  if (num == null || isNaN(num)) return "0";
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : num > 0 ? "+" : "";
  let val = "";
  if (abs >= 1_000_000) val = `${(abs / 1_000_000).toFixed(1)}M`;
  else if (abs >= 1_000) val = `${(abs / 1_000).toFixed(1)}K`;
  else val = `${Math.round(abs)}`;
  return `${sign}${val.replace(/\.0([KM])/, "$1")}`;
};

const SummaryBanner = ({ totalRevenue, totalExpenses, netProfitLoss }) => {
  const isProfit = netProfitLoss >= 0;
  const ratio = isProfit
    ? totalRevenue > 0 ? Math.min(1, Math.max(0.15, netProfitLoss / totalRevenue)) : 0.5
    : totalExpenses > 0 ? Math.min(1, Math.max(0.2, Math.abs(netProfitLoss) / totalExpenses)) : 1;

  const strokeDashoffset = (213.6 * (1 - ratio)).toFixed(1);

  return (
    <div className={styles.banner}>
      <div className={styles.donutWrapper}>
        <svg className={styles.donutSvg} viewBox="0 0 80 80">
          <circle className={styles.donutBg} cx="40" cy="40" r="34" />
          <circle className={styles.donutFill} cx="40" cy="40" r="34" style={{ strokeDashoffset, stroke: isProfit ? "#34D399" : "#F87171" }} />
        </svg>
        <div className={styles.donutContent}>
          <span className={styles.donutLabel}>الصافي</span>
          <span className={styles.donutValue} style={{ color: isProfit ? "#6EE7B7" : "#FCA5A5" }}>{formatDonutNumber(netProfitLoss)}</span>
          <span className={styles.unitSub}>EGP</span>
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
