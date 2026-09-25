import { extractDeathsDetail } from "./calcPayments";

/**
 * Calculates daily deaths, attaches disease details, and computes the exact financial loss
 * of died chicks day-by-day based on cumulative expenses and living flock count.
 */
export const calcDeathsAndMortalityLoss = (
  cycle = {},
  days = [],
  events = [],
  dailyExpenses = [],
  feedShipments = [],
  medicineInvoices = [],
  diseasesMap = new Map()
) => {
  const initialChicks = Number(cycle.number_of_chicks) || 0;
  const chickPrice = Number(cycle.chick_price) || 0;
  const initialChickCost = initialChicks * chickPrice;

  // Map events by day ID
  const eventsByDayId = new Map();
  events.forEach((evt) => {
    const list = eventsByDayId.get(Number(evt.parent_day_id)) || [];
    list.push(evt);
    eventsByDayId.set(Number(evt.parent_day_id), list);
  });

  // Map daily expenses by event ID
  const expensesByEventId = new Map();
  dailyExpenses.forEach((exp) => {
    const list = expensesByEventId.get(Number(exp.parent_event_id)) || [];
    list.push(exp);
    expensesByEventId.set(Number(exp.parent_event_id), list);
  });

  // Group feed shipment costs by creation date or day if available
  const feedCostByDay = new Map();
  feedShipments.forEach((shipment) => {
    const sacks = Number(shipment.sacks_count) || 0;
    const price = Number(shipment.sack_price) || 0;
    const cost = sacks * price;
    if (shipment.created_at) {
      const dateKey = new Date(shipment.created_at).toISOString().split("T")[0];
      feedCostByDay.set(dateKey, (feedCostByDay.get(dateKey) || 0) + cost);
    }
  });

  // Group medicine invoice costs by creation date or day if available
  const medCostByDay = new Map();
  medicineInvoices.forEach((inv) => {
    const cost = Number(inv.total_price) || 0;
    if (inv.created_at) {
      const dateKey = new Date(inv.created_at).toISOString().split("T")[0];
      medCostByDay.set(dateKey, (medCostByDay.get(dateKey) || 0) + cost);
    }
  });

  // Sort days by day_number ascending
  const sortedDays = [...days].sort((a, b) => Number(a.day_number) - Number(b.day_number));

  let cumulativeExpenses = initialChickCost;
  let cumulativeDeaths = 0;
  let cumulativeFinancialMortalityLoss = 0;

  const dailyMortalityBreakdown = sortedDays.map((day) => {
    const dayNumber = Number(day.day_number);
    const dayEvents = eventsByDayId.get(Number(day.id)) || [];

    // Sum daily expenses for events on this day
    let dayDailyExpensesCost = 0;
    const dayExpenseItems = [];

    dayEvents.forEach((evt) => {
      const eventExpenses = expensesByEventId.get(Number(evt.id)) || [];
      eventExpenses.forEach((exp) => {
        const amt = Number(exp.amount) || 0;
        dayDailyExpensesCost += amt;
        dayExpenseItems.push(exp);
      });
    });

    // Check feed and med costs associated with this day's date
    const dayDateKey = day.created_at ? new Date(day.created_at).toISOString().split("T")[0] : null;
    const dayFeedCost = dayDateKey ? feedCostByDay.get(dayDateKey) || 0 : 0;
    const dayMedCost = dayDateKey ? medCostByDay.get(dayDateKey) || 0 : 0;

    const dayDirectCost = dayDailyExpensesCost + dayFeedCost + dayMedCost;
    cumulativeExpenses += dayDirectCost;

    // Process deaths for events on this day
    let deathsToday = 0;
    const deathEventsDetails = [];

    dayEvents.forEach((evt) => {
      const deathDetail = extractDeathsDetail(evt.deaths);
      if (deathDetail.count > 0 || deathDetail.notes) {
        deathsToday += deathDetail.count;

        // Resolve disease cause if death_reason FK is present
        let diseaseCauseInfo = null;
        if (evt.death_reason) {
          diseaseCauseInfo = diseasesMap.get(Number(evt.death_reason)) || null;
        }

        deathEventsDetails.push({
          eventId: evt.id,
          count: deathDetail.count,
          notes: deathDetail.notes,
          rawDeathsJson: deathDetail.raw,
          temperatureInside: evt.temperature_inside,
          performedBy: evt.performed_by,
          diseaseReason: diseaseCauseInfo,
        });
      }
    });

    const livingChicksBeforeToday = Math.max(0, initialChicks - cumulativeDeaths);
    cumulativeDeaths += deathsToday;
    const livingChicksAfterToday = Math.max(0, initialChicks - cumulativeDeaths);

    // Cost per living chick prior to today's mortality loss
    const costPerChickToday = livingChicksBeforeToday > 0 ? cumulativeExpenses / livingChicksBeforeToday : 0;
    const financialLossToday = deathsToday * costPerChickToday;
    cumulativeFinancialMortalityLoss += financialLossToday;

    return {
      dayId: day.id,
      dayNumber,
      dayNotes: day.notes,
      dayDate: day.created_at,

      // Expenses breakdown for this day
      dayDailyExpensesCost,
      dayExpenseItems,
      dayFeedCost,
      dayMedCost,
      dayTotalDirectCost: dayDirectCost,
      cumulativeExpensesUpToDay: cumulativeExpenses,

      // Deaths & Loss analysis
      deathsToday,
      deathEventsDetails,
      cumulativeDeathsUpToDay: cumulativeDeaths,
      livingChicksBeforeToday,
      livingChicksAfterToday,
      costPerLivingChickToday: parseFloat(costPerChickToday.toFixed(2)),
      financialLossToday: parseFloat(financialLossToday.toFixed(2)),
      cumulativeFinancialMortalityLoss: parseFloat(cumulativeFinancialMortalityLoss.toFixed(2)),
    };
  });

  const finalLivingChicks = Math.max(0, initialChicks - cumulativeDeaths);
  const mortalityPercentage = initialChicks > 0 ? (cumulativeDeaths / initialChicks) * 100 : 0;

  return {
    initialChicks,
    initialChickPrice: chickPrice,
    initialChickCost,
    totalDeaths: cumulativeDeaths,
    finalLivingChicks,
    mortalityPercentage: parseFloat(mortalityPercentage.toFixed(2)),
    totalMortalityFinancialLoss: parseFloat(cumulativeFinancialMortalityLoss.toFixed(2)),
    dailyMortalityBreakdown,
  };
};
