import React from "react";
import { DollarSign, CheckCircle2 } from "lucide-react";
import { formatEgp } from "../../../../../../../../../../utils/formatters";
import styles from "./SalesHeroCard.module.css";

const SalesHeroCard = ({ revenue = 0, collected = 0, receivables = 0, heightPct = 100 }) => (
  <div className={styles.card} style={{ height: `${heightPct}%` }}>
    <div className={styles.topRow}>
      <div className={styles.titleGroup}>
        <DollarSign size={16} className={styles.icon} />
        <span>إجمالي مبيعات الدورة</span>
      </div>
      <span className={styles.badge}>Hero Card 🌟</span>
    </div>
    <div className={styles.values}>
      <div className={styles.bigAmount}>{formatEgp(revenue)}</div>
      <div className={styles.exactText}>{Math.round(revenue).toLocaleString("ar-EG")} ج.م مبيعات معتمدة</div>
    </div>
    <div className={styles.footer}>
      <div className={styles.detailRow}>
        <span>المحصل نقداً:</span>
        <span className={styles.collectedVal}>{formatEgp(collected)}</span>
      </div>
      {receivables > 0 ? (
        <div className={styles.receivableRow}>
          <span>آجل للتجار:</span>
          <span className={styles.debtVal}>{formatEgp(receivables)}</span>
        </div>
      ) : (
        <div className={styles.settledRow}>
          <CheckCircle2 size={13} />
          <span>مسدد بالكامل</span>
        </div>
      )}
    </div>
  </div>
);

export default SalesHeroCard;
