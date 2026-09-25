import React from "react";
import { Coins } from "lucide-react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./ChequeDetails.module.css";

const ChequeDetails = ({ chickCost, soldChickCost }) => {
  return (
    <div className={styles.cardSection}>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.iconBadge}><Coins size={15} /></div>
          <span>تكلفة الشيك</span>
        </div>
        <span className={styles.rowValue}>{formatEgp(chickCost)}</span>
      </div>
      <div className={styles.row} style={{ marginTop: "4px" }}>
        <div className={styles.rowLabel} style={{ paddingRight: "34px" }}>
          <span>تكلفة الشيك المباع</span>
        </div>
        <span className={styles.rowValue}>{formatEgp(soldChickCost)}</span>
      </div>
    </div>
  );
};

export default ChequeDetails;
