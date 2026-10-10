import { buildDailyDeathsTimeline } from "./buildDailyDeathsTimeline";

const buildEventMap = (arr, key) => {
  const map = new Map();
  arr.forEach((item) => {
    const k = Number(item[key]);
    const list = map.get(k) || [];
    list.push(item);
    map.set(k, list);
  });
  return map;
};

export const calcDeathsAndMortalityLoss = (cycle = {}, days = [], events = [], dailyExpenses = [], feedShipments = [], medicineInvoices = [], diseasesMap = new Map()) => {
  const initialChicks = Number(cycle.number_of_chicks) || 0;
  const initialChickCost = initialChicks * (Number(cycle.chick_price) || 0);

  const eventsByDayId = buildEventMap(events, "parent_day_id");
  const expensesByEventId = buildEventMap(dailyExpenses, "parent_event_id");

  const feedCostByDay = new Map();
  feedShipments.forEach((s) => {
    if (s.created_at) {
      const k = new Date(s.created_at).toISOString().split("T")[0];
      feedCostByDay.set(k, (feedCostByDay.get(k) || 0) + (Number(s.sacks_count) || 0) * (Number(s.sack_price) || 0));
    }
  });

  const medCostByDay = new Map();
  medicineInvoices.forEach((inv) => {
    if (inv.created_at) {
      const k = new Date(inv.created_at).toISOString().split("T")[0];
      medCostByDay.set(k, (medCostByDay.get(k) || 0) + (Number(inv.total_price) || 0));
    }
  });

  const sortedDays = [...days].sort((a, b) => Number(a.day_number) - Number(b.day_number));
  const { timeline, cumulativeDeaths, cumulativeFinancialLoss } = buildDailyDeathsTimeline({
    sortedDays, eventsByDayId, expensesByEventId, feedCostByDay, medCostByDay, diseasesMap, initialChicks, initialChickCost,
  });

  const finalLivingChicks = Math.max(0, initialChicks - cumulativeDeaths);
  const mortalityPercentage = initialChicks > 0 ? parseFloat(((cumulativeDeaths / initialChicks) * 100).toFixed(2)) : 0;

  return {
    totalDeaths: cumulativeDeaths, finalLivingChicks, mortalityPercentage,
    totalMortalityFinancialLoss: parseFloat(cumulativeFinancialLoss.toFixed(2)), dailyMortalityBreakdown: timeline,
  };
};
