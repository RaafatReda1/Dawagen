import { Activity } from "lucide-react";
import styles from "./ActiveLoadingsHeader.module.css";

const ActiveLoadingsHeader = ({ count }) => (
  <div className={styles.header}>
    <div className={styles.titleRow}>
      <Activity size={18} className={styles.icon} />
      <h2 className={styles.title}>سيارات قيد الوزن والتحميل حالياً</h2>
      <span className={styles.badge}>{count} سيارات جارية</span>
    </div>
    <span className={styles.hint}>بيانات الموازين محفوظة وتتزامن تلقائياً لحظة بلحظة</span>
  </div>
);

export default ActiveLoadingsHeader;
