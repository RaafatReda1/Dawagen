/**
 * Calculates daily feed consumption in Kg using exact sack_weight from FeedShipments,
 * estimates daily live flock biomass using FollowUpData and living chick counts,
 * and computes daily FCR timeline without hardcoded constants.
 */
export const calcDailyFCR = (
  days = [],
  events = [],
  foodWithdrawals = [],
  feedShipments = [],
  followUpData = [],
  dailyMortalityBreakdown = []
) => {
  // Map FeedShipments by ID to look up exact sack_weight
  const feedShipmentsMap = new Map();
  feedShipments.forEach((fs) => {
    feedShipmentsMap.set(Number(fs.id), fs);
  });

  // Map events by event ID to find parent_day_id
  const eventsById = new Map();
  events.forEach((evt) => {
    eventsById.set(Number(evt.id), evt);
  });

  // Map followUpData by parent_day_id
  const followUpByDayId = new Map();
  followUpData.forEach((fu) => {
    followUpByDayId.set(Number(fu.parent_day_id), fu);
  });

  // Map daily mortality stats by day ID
  const mortalityByDayId = new Map();
  dailyMortalityBreakdown.forEach((mb) => {
    mortalityByDayId.set(Number(mb.dayId), mb);
  });

  // Accumulate feed withdrawals by day ID
  const dailyFeedConsumptionMap = new Map();

  foodWithdrawals.forEach((fw) => {
    const parentEvent = eventsById.get(Number(fw.parent_event_id));
    if (!parentEvent) return;

    const dayId = Number(parentEvent.parent_day_id);
    const shipment = feedShipmentsMap.get(Number(fw.food_id)) || fw.FeedShipments || null;

    const sacksConsumed = Number(fw.sacks_consumed) || 0;
    // Extract sack_weight directly from FeedShipments table
    const sackWeightKg = shipment ? Number(shipment.sack_weight) || 0 : 0;
    const kgConsumed = sacksConsumed * sackWeightKg;

    const current = dailyFeedConsumptionMap.get(dayId) || {
      sacksConsumed: 0,
      kgConsumed: 0,
      withdrawalsList: [],
    };

    current.sacksConsumed += sacksConsumed;
    current.kgConsumed += kgConsumed;
    current.withdrawalsList.push({
      ...fw,
      shipmentFeedName: shipment?.feed_name || null,
      sackWeightKg,
      calculatedKg: kgConsumed,
    });

    dailyFeedConsumptionMap.get(dayId) ? null : dailyFeedConsumptionMap.set(dayId, current);
  });

  // Sort days by day_number ascending
  const sortedDays = [...days].sort((a, b) => Number(a.day_number) - Number(b.day_number));

  let cumulativeSacksConsumed = 0;
  let cumulativeKgConsumed = 0;

  const dailyFCRTimeline = sortedDays.map((day) => {
    const dayId = Number(day.id);
    const dayNumber = Number(day.day_number);

    const feedStats = dailyFeedConsumptionMap.get(dayId) || {
      sacksConsumed: 0,
      kgConsumed: 0,
      withdrawalsList: [],
    };

    cumulativeSacksConsumed += feedStats.sacksConsumed;
    cumulativeKgConsumed += feedStats.kgConsumed;

    // Retrieve living chicks count on this day from mortality breakdown
    const mortalityData = mortalityByDayId.get(dayId);
    const livingChicks = mortalityData ? mortalityData.livingChicksAfterToday : 0;

    // Retrieve bird average weight from FollowUpData for this day
    const followUp = followUpByDayId.get(dayId);
    let avgWeightKg = 0;

    if (followUp) {
      if (followUp.wight_random_sample && Number(followUp.wight_random_sample) > 0) {
        avgWeightKg = Number(followUp.wight_random_sample);
      } else {
        const weights = [
          Number(followUp.weight_small) || 0,
          Number(followUp.weight_medium) || 0,
          Number(followUp.weight_large) || 0,
        ].filter((w) => w > 0);

        if (weights.length > 0) {
          avgWeightKg = weights.reduce((a, b) => a + b, 0) / weights.length;
        }
      }
    }

    // Convert weight to kg if provided in grams (if > 50 assumes grams)
    if (avgWeightKg > 50) {
      avgWeightKg = avgWeightKg / 1000;
    }

    const estimatedBiomassKg = livingChicks * avgWeightKg;
    const dailyFCR = estimatedBiomassKg > 0 ? cumulativeKgConsumed / estimatedBiomassKg : null;

    return {
      dayId,
      dayNumber,
      dayNotes: day.notes,

      // Feed consumed on this day
      sacksConsumedToday: feedStats.sacksConsumed,
      kgConsumedToday: feedStats.kgConsumed,
      withdrawalsList: feedStats.withdrawalsList,

      // Cumulative feed consumed
      cumulativeSacksConsumed,
      cumulativeKgConsumed,

      // Flock Biomass & FCR
      livingChicks,
      avgWeightKg: parseFloat(avgWeightKg.toFixed(3)),
      estimatedBiomassKg: parseFloat(estimatedBiomassKg.toFixed(2)),
      dailyFCR: dailyFCR !== null ? parseFloat(dailyFCR.toFixed(2)) : null,
    };
  });

  const latestDayFCR = dailyFCRTimeline.length > 0 ? dailyFCRTimeline[dailyFCRTimeline.length - 1].dailyFCR : null;

  return {
    totalSacksConsumed: cumulativeSacksConsumed,
    totalKgConsumed: cumulativeKgConsumed,
    finalFCR: latestDayFCR,
    dailyFCRTimeline,
  };
};
