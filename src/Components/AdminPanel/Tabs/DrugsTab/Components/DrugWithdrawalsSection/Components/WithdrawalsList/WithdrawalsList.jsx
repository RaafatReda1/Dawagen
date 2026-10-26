import { useMemo } from "react";
import { groupDrugWithdrawalsByDay } from "../../../../Utils";
import { useExpandedDrugDays } from "./Hooks/useExpandedDrugDays";
import DayDrugPanel from "./Components/DayDrugPanel/DayDrugPanel";
import styles from "./WithdrawalsList.module.css";

const WithdrawalsList = ({ withdrawals = [], events = [], days = [], diseases = [] }) => {
  const dayGroups = useMemo(
    () => groupDrugWithdrawalsByDay(withdrawals, events, days),
    [withdrawals, events, days]
  );
  const { expandedDays, toggleDay, toggleAll, allOpen } = useExpandedDrugDays(dayGroups);

  if (dayGroups.length === 0) {
    return <div className={styles.empty}>لا توجد جرعات أدوية مسجلة في هذه الدورة حتى الآن.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topActions}>
        <span className={styles.summaryText}>
          مسجل استهلاك علاجي في {dayGroups.length} أيام دورة
        </span>
        <button type="button" onClick={toggleAll} className={styles.toggleAllBtn}>
          {allOpen ? "طي كافة الأيام" : "توسيع كافة الأيام"}
        </button>
      </div>

      <div className={styles.list}>
        {dayGroups.map((group) => (
          <DayDrugPanel
            key={group.dayId}
            group={group}
            diseases={diseases}
            isExpanded={expandedDays.has(group.dayId)}
            onToggle={() => toggleDay(group.dayId)}
          />
        ))}
      </div>
    </div>
  );
};

export default WithdrawalsList;
