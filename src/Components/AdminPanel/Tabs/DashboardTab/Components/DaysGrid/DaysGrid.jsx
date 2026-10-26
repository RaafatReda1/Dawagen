import DayCard from "../DayCard/DayCard";
import styles from "./DaysGrid.module.css";

const DaysGrid = ({ days, events = [], onSelectDay }) => {
  const getDayStats = (dayId) => {
    if (!dayId) return { count: 0, temp: null };
    const dayEvents = events.filter((e) => e.parent_day_id === dayId);
    const latestEventWithTemp = [...dayEvents]
      .reverse()
      .find((e) => e.temperature_inside != null);
    return {
      count: dayEvents.length,
      temp: latestEventWithTemp ? latestEventWithTemp.temperature_inside : null,
    };
  };

  return (
    <div className={styles.grid}>
      {days.map((day) => {
        const stats = getDayStats(day.id);
        return (
          <DayCard
            key={`${day.cycle_id}-${day.day_number}`}
            day={day}
            eventsCount={stats.count}
            latestTemp={stats.temp}
            onSelect={onSelectDay}
          />
        );
      })}
    </div>
  );
};

export default DaysGrid;
