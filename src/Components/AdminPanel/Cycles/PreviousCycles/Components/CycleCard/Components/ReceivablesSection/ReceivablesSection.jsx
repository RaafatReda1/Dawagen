import React from "react";
import { Wallet, ArrowRightLeft, ArrowLeftRight } from "lucide-react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./ReceivablesSection.module.css";

const ReceivablesSection = ({ receivablesOwed, debtsOwed }) => {
  return (
    <div className={styles.cardSection}>
      <div className={styles.sectionHeader}>
        <Wallet size={16} color="#4B5563" />
        <span>المستحقات</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.iconBadge} style={{ background: "#D1FAE5", color: "#10B981" }}><ArrowRightLeft size={14} /></div>
          <span>لك عند التاجر</span>
        </div>
        <span className={styles.rowValue} style={{ color: "#059669" }}>{formatEgp(receivablesOwed, { showSign: true })}</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.iconBadge} style={{ background: "#FFEDD5", color: "#F97316" }}><ArrowLeftRight size={14} /></div>
          <span>باقي عليك حساب</span>
        </div>
        <span className={styles.rowValue} style={{ color: "#DC2626" }}>{formatEgp(-debtsOwed, { showSign: false })}</span>
      </div>
    </div>
  );
};

export default ReceivablesSection;
