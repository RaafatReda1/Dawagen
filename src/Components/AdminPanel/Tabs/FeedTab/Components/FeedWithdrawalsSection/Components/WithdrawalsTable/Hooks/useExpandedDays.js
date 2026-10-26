import { useState } from "react";

export const useExpandedDays = (dayGroups = []) => {
  const [expandedDays, setExpandedDays] = useState(() => new Set());

  const toggleDay = (dayId) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      next.has(dayId) ? next.delete(dayId) : next.add(dayId);
      return next;
    });
  };

  const toggleAll = () => {
    if (expandedDays.size === dayGroups.length) {
      setExpandedDays(new Set());
    } else {
      setExpandedDays(new Set(dayGroups.map((g) => g.dayId)));
    }
  };

  return {
    expandedDays,
    toggleDay,
    toggleAll,
    allOpen: dayGroups.length > 0 && expandedDays.size === dayGroups.length,
  };
};
