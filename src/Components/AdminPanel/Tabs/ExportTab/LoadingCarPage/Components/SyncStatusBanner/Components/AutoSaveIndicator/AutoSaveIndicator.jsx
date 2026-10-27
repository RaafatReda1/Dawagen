import { CheckCircle2, RefreshCw, AlertCircle } from "lucide-react";
import styles from "./AutoSaveIndicator.module.css";

const AutoSaveIndicator = ({ status }) => {
  if (status === "saving") {
    return (
      <div className={`${styles.wrap} ${styles.saving}`}>
        <RefreshCw size={14} className={styles.spin} />
        <span>جاري الحفظ بالسيرفر والتخزين المحلي...</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`${styles.wrap} ${styles.error}`}>
        <AlertCircle size={14} />
        <span>تم الحفظ محلياً فقط (تعذر الاتصال بالسيرفر)</span>
      </div>
    );
  }

  return (
    <div className={`${styles.wrap} ${styles.saved}`}>
      <CheckCircle2 size={14} />
      <span>محفوظ تلقائياً في قاعدة البيانات والتخزين المحلي</span>
    </div>
  );
};

export default AutoSaveIndicator;
