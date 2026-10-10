import React from "react";
import { ArrowRight, Bird, Calendar, Printer } from "lucide-react";
import styles from "./CyclePageHeader.module.css";

const CyclePageHeader = ({ cycleId, chickType, startDate, endDate, durationDays, onBack }) => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}><Bird size={26} /></div>
          <div>
            <h2 className={styles.mainTitle}>الدورة رقم {cycleId || "DATA HERE!"} — {chickType || "DATA HERE!"}</h2>
            <p className={styles.metaText}>
              DATA HERE! كتكوت | التكلفة الأولية: DATA HERE!
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className={styles.pdfReportBtn}>
            <Printer size={16} />
            <span>تحميل التقرير المالي PDF</span>
          </button>
          <button onClick={onBack} className={styles.backBtn}>
            <ArrowRight size={18} />
            <span>الرجوع</span>
          </button>
        </div>
      </div>
      <div className={styles.durationPill}>
        <Calendar size={16} />
        <span>{startDate || "DATA HERE!"} {"->"} {endDate || "DATA HERE!"} (مدة الدورة: {durationDays || "DATA HERE!"} يوم)</span>
      </div>
    </div>
  );
};

export default CyclePageHeader;
