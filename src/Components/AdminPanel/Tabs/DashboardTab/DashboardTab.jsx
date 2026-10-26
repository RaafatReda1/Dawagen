import { useMemo, useState } from "react";
import useCycleDetails from "../../../../hooks/useCycleDetails";
import { useCycleRouteInfo } from "../../Hooks/useCycleRouteInfo";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import DaysGrid from "./Components/DaysGrid/DaysGrid";
import AddEventsModal from "./Components/AddEventsModal/AddEventsModal";
import styles from "./DashboardTab.module.css";

const DashboardTab = () => {
  const { cycleId, cycleData, isCurrentCycle, loading, notFound } = useCycleRouteInfo();
  const { rawData, refetch } = useCycleDetails(cycleId);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = useMemo(() => {
    const existingDays = rawData?.days ?? [];
    if (!isCurrentCycle || !rawData?.days) return existingDays;
    return [
      ...existingDays,
      { day_number: existingDays.length + 1, cycle_id: cycleId, notes: "يوم جديد" },
    ];
  }, [rawData?.days, cycleId, isCurrentCycle]);

  if (loading) return <div className={styles.status}>جاري التحميل...</div>;
  if (notFound || !cycleId) return <div className={styles.status}>الدورة غير موجودة</div>;

  return (
    <div className={styles.container}>
      <DashboardHeader
        cycleId={cycleId}
        cycleData={cycleData}
        isCurrentCycle={isCurrentCycle}
        daysCount={days.length}
      />
      <DaysGrid days={days} events={rawData?.events} onSelectDay={setSelectedDay} />
      {selectedDay && (
        <AddEventsModal
          isOpen={Boolean(selectedDay)}
          day={selectedDay}
          cycleId={cycleId}
          rawData={rawData}
          refetch={refetch}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
};

export default DashboardTab;