import { useMemo } from "react";
import useCycleDetails from "../../../../hooks/useCycleDetails";
import { useCycleRouteInfo } from "../../Hooks/useCycleRouteInfo";
import styles from "./DashboardTab.module.css";
import DayCard from "./Components/DayCard/DayCard";

const DashboardTab = () => {
  const { cycleId, cycleData, isCurrentCycle, loading, notFound } =
    useCycleRouteInfo();

  const { rawData } = useCycleDetails(1);

  const days = useMemo(() => {
    const existingDays = rawData?.days ?? [];

    if (!isCurrentCycle || !rawData?.days) return existingDays;

    const newDay = {
      day_number: existingDays.length + 1,
      cycle_id: cycleId,
      create_at: new Date(),
      notes: "This is a new day",
    };

    return [...existingDays, newDay];
  }, [rawData?.days, cycleId, isCurrentCycle]);

  if (loading) return <div>جاري التحميل...</div>;

  if (notFound || !cycleId)
    return <div>الدورة غير موجودة أو لا توجد دورة نشطة</div>;

  return (
    <div>
      <h2>الدورة رقم: {cycleId}</h2>
      <p>نوع السلالة: {cycleData?.chick_type}</p>
      <p>الحالة: {isCurrentCycle ? "دورة نشطة الآن" : "دورة سابقة / أرشيف"}</p>

      <div className={styles.cardsContainer}>
        <p className={styles.daysHeaderNumber}>Days: {days.length}</p>

        <div className={styles.card}>
          {days.map((day) => (
            <DayCard
              key={`${day.cycle_id}-${day.day_number}`}
              day={day}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;