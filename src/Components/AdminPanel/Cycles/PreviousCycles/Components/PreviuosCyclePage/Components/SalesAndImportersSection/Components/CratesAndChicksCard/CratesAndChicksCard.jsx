import React from "react";
import { Package, Layers } from "lucide-react";
import styles from "./CratesAndChicksCard.module.css";

const CratesAndChicksCard = ({ crates = 0, birds = 0, avgBirdWeight = null, birdsPerCrate = null }) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <Package size={18} className={styles.icon} />
        <span>الأقفاص والطيور المباعة</span>
      </div>
      <span className={styles.badge}>تسليم المزرعة</span>
    </div>
    <div className={styles.metricsGrid}>
      <div className={styles.metricItem}>
        <div className={styles.iconOrange}><Package size={17} /></div>
        <div className={styles.numberGroup}>
          <div className={styles.bigVal}>{crates.toLocaleString("ar-EG")}</div>
          <div className={styles.label}>قفص مباع</div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.metricItem}>
        <div className={styles.iconGreen}><Layers size={17} /></div>
        <div className={styles.numberGroup}>
          <div className={styles.bigVal}>{birds.toLocaleString("ar-EG")}</div>
          <div className={styles.label}>طائر / فرخة</div>
        </div>
      </div>
    </div>
    <div className={styles.kpiBar}>
      {avgBirdWeight && <span className={styles.kpiChip}>متوسط وزن الطائر: <strong>{avgBirdWeight} كجم</strong></span>}
      {birdsPerCrate && <span className={styles.kpiChip}>معدل القفص: <strong>{birdsPerCrate} طائر</strong></span>}
    </div>
  </div>
);

export default CratesAndChicksCard;
