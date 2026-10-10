import React from "react";
import { TrendingUp } from "lucide-react";
import styles from "./ProfitLossFooter.module.css";

const ProfitLossFooter = () => {
  return (
    <div className={styles.footerBox} style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
      <div className={styles.labelGroup} style={{ color: "#065F46" }}>
        <div className={styles.iconCircle} style={{ background: "#D1FAE5" }}>
          <TrendingUp size={16} color="#059669" />
        </div>
        <span>خسارة/كسب الحساب</span>
      </div>
      <span className={styles.value} style={{ color: "#059669" }}>
        DATA HERE!
      </span>
    </div>
  );
};

export default ProfitLossFooter;
