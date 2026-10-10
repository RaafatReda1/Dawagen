import { extractDeathsDetail } from "./calcPayments";

export const buildDailyDeathsTimeline = ({
  sortedDays = [], eventsByDayId = new Map(), expensesByEventId = new Map(),
  feedCostByDay = new Map(), medCostByDay = new Map(), diseasesMap = new Map(),
  initialChicks = 0, initialChickCost = 0,
}) => {
  let cumulativeExpenses = initialChickCost, cumulativeDeaths = 0, cumulativeFinancialLoss = 0;

  const timeline = sortedDays.map((day) => {
    const dayEvents = eventsByDayId.get(Number(day.id)) || [];
    let dayDailyCost = 0;
    dayEvents.forEach((evt) => (expensesByEventId.get(Number(evt.id)) || []).forEach((exp) => { dayDailyCost += Number(exp.amount) || 0; }));

    const dayDate = day.created_at ? new Date(day.created_at).toISOString().split("T")[0] : null;
    const directCost = dayDailyCost + (dayDate ? (feedCostByDay.get(dayDate) || 0) + (medCostByDay.get(dayDate) || 0) : 0);
    cumulativeExpenses += directCost;

    let deathsToday = 0;
    const deathDetails = [];
    dayEvents.forEach((evt) => {
      const d = extractDeathsDetail(evt.deaths);
      if (d.count > 0 || d.notes) {
        deathsToday += d.count;
        deathDetails.push({ eventId: evt.id, count: d.count, notes: d.notes, disease: diseasesMap.get(Number(evt.death_reason)) || null });
      }
    });

    const livingBefore = Math.max(0, initialChicks - cumulativeDeaths);
    cumulativeDeaths += deathsToday;
    const costPerChick = livingBefore > 0 ? cumulativeExpenses / livingBefore : 0;
    const lossToday = deathsToday * costPerChick;
    cumulativeFinancialLoss += lossToday;

    return {
      dayId: day.id, dayNumber: Number(day.day_number), dayNotes: day.notes,
      deathsToday, deathDetails, cumulativeDeaths,
      livingChicksAfterToday: Math.max(0, initialChicks - cumulativeDeaths),
      costPerChickPriorToDeath: parseFloat(costPerChick.toFixed(2)),
      financialLossToday: parseFloat(lossToday.toFixed(2)),
      cumulativeFinancialMortalityLoss: parseFloat(cumulativeFinancialLoss.toFixed(2)),
    };
  });

  return { timeline, cumulativeDeaths, cumulativeFinancialLoss };
};
