import styles from "./Sidebar.module.css";

const CycleNavHeader = ({ isViewingHistorical, cycleId, chickType, collapsed }) => {
  if (collapsed) {
    return (
      <div className={styles.cycleHeaderCollapsed} title={isViewingHistorical ? `دورة #${cycleId}` : "الدورة الحالية"}>
        <span className={`${styles.statusDot} ${isViewingHistorical ? styles.dotCompleted : styles.dotActive}`} />
      </div>
    );
  }

  return (
    <div className={styles.cycleHeaderGroup}>
      <div className={styles.cycleStatusRow}>
        <span className={`${styles.statusDot} ${isViewingHistorical ? styles.dotCompleted : styles.dotActive}`} />
        <span className={styles.cycleCategoryTitle}>
          {isViewingHistorical ? `دورة سابقة #${cycleId}` : "الدورة الحالية"}
        </span>
      </div>
      <span className={styles.cycleSubtitle}>
        {chickType ? `سلالة ${chickType}` : (isViewingHistorical ? "معاينة مكتملة" : "نشطة الآن")}
      </span>
    </div>
  );
};

export default CycleNavHeader;
