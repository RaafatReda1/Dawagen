import React from "react";
import { Bird } from "lucide-react";
import styles from "./CycleLoader.module.css";

const CycleLoader = ({ progress = 0, stepMessage = "جاري التحميل..." }) => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.iconPulseBox}>
        <Bird size={34} />
      </div>
      <h3 className={styles.title}>داوجن — معالج البيانات والتحليلات</h3>
      <p className={styles.subtitle}>يتم قراءة وحساب كافة المعاملات والمدفوعات والمبيعات لجميع الدورات</p>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.percentTag}>{progress}%</div>

      <div className={styles.statusContainer}>
        <div className={styles.dotSpinner} />
        <span>{stepMessage}</span>
      </div>
    </div>
  );
};

export default CycleLoader;
