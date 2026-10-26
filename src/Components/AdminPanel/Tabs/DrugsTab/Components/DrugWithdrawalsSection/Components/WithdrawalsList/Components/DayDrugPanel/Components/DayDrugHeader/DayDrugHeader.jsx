import { Calendar, ChevronDown, ChevronUp, Syringe } from "lucide-react";
import styles from "./DayDrugHeader.module.css";

const DayDrugHeader = ({ group, isExpanded, onToggle }) => {
  const itemsCount = group.items.length;

  return (
    <div className={styles.header} onClick={onToggle} role="button" tabIndex={0}>
      <div className={styles.rightSide}>
        <div className={styles.dayBadge}>
          <Calendar size={15} />
          <span>{group.dayNumber ? `يوم ${group.dayNumber}` : "يوم غير محدد"}</span>
        </div>
        <span className={styles.countBadge}>
          <Syringe size={13} />
          {itemsCount} {itemsCount > 1 ? "جرعات علاجية" : "جرعة واحدة"}
        </span>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>العبوات:</span>
          <strong className={styles.statVal}>{group.totalPackages} عبوة</strong>
        </div>
        {group.totalCapacity > 0 && (
          <div className={styles.statItem}>
            <span className={styles.statLabel}>إجمالي الكمية:</span>
            <strong className={styles.statVal}>{group.totalCapacity} مل / جم</strong>
          </div>
        )}
      </div>

      <div className={styles.leftSide}>
        <span className={styles.actionText}>{isExpanded ? "طي" : "عرض التفاصيل"}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
    </div>
  );
};

export default DayDrugHeader;
