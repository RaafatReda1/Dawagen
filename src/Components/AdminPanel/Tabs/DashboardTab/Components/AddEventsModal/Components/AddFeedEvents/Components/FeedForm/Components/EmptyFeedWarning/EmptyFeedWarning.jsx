import { AlertCircle } from "lucide-react";
import styles from "./EmptyFeedWarning.module.css";

const EmptyFeedWarning = () => (
  <div className={styles.warning}>
    <AlertCircle size={20} className={styles.icon} />
    <div>
      <p className={styles.title}>لا توجد شحنات علف مسجلة لهذه الدورة في قاعدة البيانات.</p>
      <span className={styles.sub}>يجب تسجيل شحنة علف أولاً لتتمكن من تسجيل السحب.</span>
    </div>
  </div>
);

export default EmptyFeedWarning;
