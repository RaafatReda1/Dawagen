import React from "react";
import { FileText, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";
import styles from "./FinancialDetails.module.css";

const FinancialDetails = ({ totalRevenue, totalExpenses, netProfitLoss }) => {
  const isProfit = netProfitLoss >= 0;
  return (
    <div className={styles.cardSection}>
      <div className={styles.sectionHeader}>
        <FileText size={16} color="#4B5563" />
        <span>تفاصيل الدورة المالية</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.iconBadge} style={{ background: "#D1FAE5", color: "#10B981" }}><ArrowUpRight size={15} /></div>
          <span>دخل الدورة</span>
        </div>
        <span className={styles.rowValue}>{totalRevenue.toLocaleString()} EGP</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.iconBadge} style={{ background: "#FEE2E2", color: "#EF4444" }}><ArrowDownRight size={15} /></div>
          <span>تكلفة الدورة</span>
        </div>
        <span className={styles.rowValue}>{totalExpenses.toLocaleString()} EGP</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.iconBadge} style={{ background: isProfit ? "#D1FAE5" : "#FEE2E2", color: isProfit ? "#10B981" : "#EF4444" }}><BarChart3 size={15} /></div>
          <span>صافي النتيجة</span>
        </div>
        <span className={styles.rowValue} style={{ color: isProfit ? "#059669" : "#DC2626" }}>{isProfit ? "+" : ""}{netProfitLoss.toLocaleString()} EGP</span>
      </div>
    </div>
  );
};

export default FinancialDetails;
