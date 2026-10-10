import { useEffect, useState } from "react";
import useCycleDetails from "../../../../hooks/useCycleDetails";
import { useCycleRouteInfo } from "../../Hooks/useCycleRouteInfo";
import styles from "./DashboardTab.module.css";
import DayCard from "./Components/DayCard/DayCard";
const DashboardTab = () => {
  const { cycleId, cycleData, isCurrentCycle, loading, notFound } =
    useCycleRouteInfo();
  const { rawData, loadingCycleData } = useCycleDetails(1); // rawData.cycle, rawData.days, rawData.events, rawData.farmSales, rawData.feedShipments...
  const days = rawData?.days;
  const daysLength = rawData?.days?.length + 1; // this 1 is added to account for the first day

  if (loading) return <div>جاري التحميل...</div>;
  if (notFound || !cycleId)
    return <div>الدورة غير موجودة أو لا توجد دورة نشطة</div>;

  return (
    <div>
      <h2>الدورة رقم: {cycleId}</h2>
      <p>نوع السلالة: {cycleData?.chick_type}</p>
      <p>الحالة: {isCurrentCycle ? "دورة نشطة الآن" : "دورة سابقة / أرشيف"}</p>

      <div className={styles.cardsContainer}>
        <p className={styles.daysHeaderNumber}>Days: {daysLength}</p>

        <div className={styles.card}>
            {days.map(day=>{
                return (<DayCard day={day}/>)
            })}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
