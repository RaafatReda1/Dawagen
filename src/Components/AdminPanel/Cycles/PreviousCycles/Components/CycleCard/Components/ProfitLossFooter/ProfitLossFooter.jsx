import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./ProfitLossFooter.module.css";

const ProfitLossFooter = ({ netProfitLoss }) => {
  const isProfit = netProfitLoss >= 0;
  return (
    <div className={styles.footerBox} style={{ background: isProfit ? "#ECFDF5" : "#FEF2F2", border: `1px solid ${isProfit ? "#A7F3D0" : "#FCA5A5"}` }}>
      <div className={styles.labelGroup} style={{ color: isProfit ? "#065F46" : "#991B1B" }}>
        <div className={styles.iconCircle} style={{ background: isProfit ? "#D1FAE5" : "#FEE2E2" }}>
          {isProfit ? <TrendingUp size={16} color="#059669" /> : <TrendingDown size={16} color="#DC2626" />}
        </div>
        <span>خسارة/كسب الحساب</span>
      </div>
      <span className={styles.value} style={{ color: isProfit ? "#059669" : "#DC2626" }}>
        {formatEgp(netProfitLoss, { showSign: true })}
      </span>
    </div>
  );
};

export default ProfitLossFooter;
