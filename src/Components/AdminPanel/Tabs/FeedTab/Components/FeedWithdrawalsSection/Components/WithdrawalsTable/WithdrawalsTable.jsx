import { useMemo } from "react";
import { groupWithdrawalsByDay } from "../../../../Utils";
import { useExpandedDays } from "./Hooks/useExpandedDays";
import DayWithdrawalPanel from "./Components/DayWithdrawalPanel/DayWithdrawalPanel";
import styles from "./WithdrawalsTable.module.css";

const WithdrawalsTable = ({ withdrawals = [], events = [], days = [] }) => {
  const dayGroups = useMemo(
    () => groupWithdrawalsByDay(withdrawals, events, days),
    [withdrawals, events, days]
  );
  const { expandedDays, toggleDay, toggleAll, allOpen } = useExpandedDays(dayGroups);

  if (dayGroups.length === 0) {
    return <div className={styles.empty}>لا توجد سحوبات علف مسجلة في هذه الدورة حتى الآن.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topActions}>
        <span className={styles.summaryText}>
          مسجل استهلاك في {dayGroups.length} أيام دورة
        </span>
        <button type="button" onClick={toggleAll} className={styles.toggleAllBtn}>
          {allOpen ? "طي كافة الأيام" : "توسيع كافة الأيام"}
        </button>
      </div>

      <div className={styles.list}>
        {dayGroups.map((group) => (
          <DayWithdrawalPanel
            key={group.dayId}
            group={group}
            isExpanded={expandedDays.has(group.dayId)}
            onToggle={() => toggleDay(group.dayId)}
          />
        ))}
      </div>
    </div>
  );
};

export default WithdrawalsTable;
