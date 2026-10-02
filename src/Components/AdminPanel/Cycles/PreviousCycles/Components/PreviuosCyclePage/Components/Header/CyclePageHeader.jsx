import React from "react";
import { ArrowRight, Bird, Calendar, Printer } from "lucide-react";
import { formatEgp } from "../../../../../../../../utils/formatters";
import { generateCycleReportPdf } from "../../../../../../../../utils/pdfGenerator";
import styles from "./CyclePageHeader.module.css";

const CyclePageHeader = ({ cycleId, chickType, chicksCount, chickPrice, chickCost, startDate, endDate, durationDays, onBack, metrics }) => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBox}><Bird size={26} /></div>
          <div>
            <h2 className={styles.mainTitle}>الدورة رقم {cycleId} — {chickType}</h2>
            <p className={styles.metaText}>
              {chicksCount?.toLocaleString()} كتكوت بسعر {chickPrice} ج.م/كتكوت | التكلفة الأولية: {formatEgp(chickCost)}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {metrics && (
            <button onClick={() => generateCycleReportPdf(metrics)} className={styles.pdfReportBtn}>
              <Printer size={16} />
              <span>تحميل التقرير المالي PDF</span>
            </button>
          )}
          <button onClick={onBack} className={styles.backBtn}>
            <ArrowRight size={18} />
            <span>الرجوع</span>
          </button>
        </div>
      </div>
      <div className={styles.durationPill}>
        <Calendar size={16} />
        <span>{startDate} {"->"} {endDate} (مدة الدورة: {durationDays} يوم)</span>
      </div>
    </div>
  );
};

export default CyclePageHeader;
