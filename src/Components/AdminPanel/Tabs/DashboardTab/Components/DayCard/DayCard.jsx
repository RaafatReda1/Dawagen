import { Calendar, Thermometer, Plus } from "lucide-react";
import styles from "./DayCard.module.css";

const DayCard = ({ day, onSelect, eventsCount = 0, latestTemp = null }) => {
  const { day_number, notes } = day;

  return (
    <div className={styles.card} onClick={() => onSelect && onSelect(day)}>
      <div className={styles.header}>
        <div className={styles.dayBadge}>
          <Calendar size={15} className={styles.icon} />
          <span className={styles.dayText}>يوم {day_number}</span>
        </div>
        <span className={eventsCount > 0 ? styles.eventsBadge : styles.emptyBadge}>
          {eventsCount > 0 ? `${eventsCount} أحداث` : "لا توجد أحداث"}
        </span>
      </div>

      <div className={styles.body}>
        {latestTemp != null ? (
          <div className={styles.tempChip}>
            <Thermometer size={13} />
            <span>{latestTemp}°C</span>
          </div>
        ) : (
          <span className={styles.statusText}>{notes || "جاهز لتسجيل البيانات"}</span>
        )}
      </div>

      <button
        type="button"
        className={styles.addBtn}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(day);
        }}
      >
        <Plus size={15} />
        <span>إضافة حدث</span>
      </button>
    </div>
  );
};

export default DayCard;