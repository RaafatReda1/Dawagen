import { Calendar, ChevronDown, ChevronUp, Package } from "lucide-react";
import styles from "./DayPanelHeader.module.css";

const DayPanelHeader = ({ group, isExpanded, onToggle }) => {
  const tons = (group.totalKg / 1000).toFixed(3);
  const itemsCount = group.items.length;

  return (
    <div className={styles.header} onClick={onToggle} role="button" tabIndex={0}>
      <div className={styles.rightSide}>
        <div className={styles.dayBadge}>
          <Calendar size={15} />
          <span>{group.dayNumber ? `يوم ${group.dayNumber}` : "يوم غير محدد"}</span>
        </div>
        <span className={styles.countBadge}>
          <Package size={13} />
          {itemsCount} {itemsCount > 1 ? "سحوبات" : "سحب واحد"}
        </span>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>إجمالي المسحوب:</span>
          <strong className={styles.statVal}>{group.totalSacks.toLocaleString()} شيكارة</strong>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>الوزن:</span>
          <strong className={styles.statVal}>{group.totalKg.toLocaleString()} كجم ({tons} طن)</strong>
        </div>
        {group.hasDamaged ? (
          <span className={styles.damagedTag}>يوجد هالك</span>
        ) : (
          <span className={styles.consumedTag}>مستهلك للطيور</span>
        )}
      </div>

      <div className={styles.leftSide}>
        <span className={styles.actionText}>{isExpanded ? "طي" : "عرض التفاصيل"}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
    </div>
  );
};

export default DayPanelHeader;
