import React from "react";
import { CheckCircle2, Calendar, Bird } from "lucide-react";
import styles from "./CycleHeader.module.css";

const CycleHeader = ({ cycleNumber, chickType, startDate, endDate, durationDays, isActive }) => {
  return (
    <div className={styles.header}>
      <img src="/CycleCardHeaderImg.png" alt="Header Bg" className={styles.bgImg} />
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <div className={styles.chickIconBox}>
            <Bird size={24} />
          </div>
          <div>
            <h3 className={styles.titleText}>الدورة رقم {cycleNumber}</h3>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}><Bird size={13} /> {chickType}</span>
              <span className={styles.metaItem}><Calendar size={13} /> {startDate}</span>
            </div>
          </div>
        </div>
        <span className={styles.badge} style={{ background: isActive ? "#D1FAE5" : "#E5E7EB", color: isActive ? "#065F46" : "#374151" }}>
          <CheckCircle2 size={13} /> {isActive ? "نشطة" : "مكتملة"}
        </span>
      </div>
      <div className={styles.progressContainer}>
        <Calendar size={13} />
        <span>من {startDate} إلى {endDate}</span>
        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarFill} style={{ width: isActive ? "65%" : "100%" }} />
        </div>
        <span className={styles.daysTag}>{durationDays} يوم</span>
      </div>
    </div>
  );
};

export default CycleHeader;
