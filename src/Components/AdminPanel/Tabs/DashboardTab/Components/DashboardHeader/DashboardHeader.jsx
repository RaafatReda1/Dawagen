import { Activity } from "lucide-react";
import styles from "./DashboardHeader.module.css";

const DashboardHeader = ({ cycleId, cycleData, isCurrentCycle, daysCount }) => (
  <header className={styles.header}>
    <div className={styles.mainInfo}>
      <div className={styles.iconBox}>
        <Activity size={24} />
      </div>
      <div className={styles.titleArea}>
        <div className={styles.titleRow}>
          <h1 className={styles.cycleTitle}>لوحة متابعة الدورة #{cycleId}</h1>
          <span className={isCurrentCycle ? styles.activeBadge : styles.archivedBadge}>
            {isCurrentCycle ? "دورة نشطة" : "دورة مؤرشفة"}
          </span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            السلالة: <strong>{cycleData?.chick_type || "غير محدد"}</strong>
          </span>
          {cycleData?.number_of_chicks && (
            <span className={styles.metaItem}>
              العدد الأولي: <strong>{Number(cycleData.number_of_chicks).toLocaleString()} طائر</strong>
            </span>
          )}
        </div>
      </div>
    </div>

    <div className={styles.statsCard}>
      <span className={styles.statsNum}>{daysCount}</span>
      <span className={styles.statsLabel}>أيام مسجلة</span>
    </div>
  </header>
);

export default DashboardHeader;
