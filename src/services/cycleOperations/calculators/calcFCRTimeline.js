export const calcFCRTimeline = (sortedDays = [], dailyFeedMap = new Map(), mortalityByDayId = new Map(), followUpByDayId = new Map()) => {
  let cumulativeSacks = 0, cumulativeKg = 0;

  const timeline = sortedDays.map((day) => {
    const dayId = Number(day.id);
    const feed = dailyFeedMap.get(dayId) || { sacksConsumed: 0, kgConsumed: 0, withdrawalsList: [] };
    cumulativeSacks += feed.sacksConsumed;
    cumulativeKg += feed.kgConsumed;

    const livingChicks = mortalityByDayId.get(dayId)?.livingChicksAfterToday || 0;
    const fu = followUpByDayId.get(dayId);
    let avgWeight = Number(fu?.wight_random_sample) || 0;
    if (!avgWeight && fu) {
      const weights = [Number(fu.weight_small) || 0, Number(fu.weight_medium) || 0, Number(fu.weight_large) || 0].filter((w) => w > 0);
      avgWeight = weights.length > 0 ? weights.reduce((a, b) => a + b, 0) / weights.length : 0;
    }
    if (avgWeight > 50) avgWeight = avgWeight / 1000;

    const estimatedBiomassKg = livingChicks * avgWeight;
    const dailyFCR = estimatedBiomassKg > 0 ? parseFloat((cumulativeKg / estimatedBiomassKg).toFixed(2)) : null;

    return {
      dayId, dayNumber: Number(day.day_number), dayNotes: day.notes,
      sacksConsumedToday: feed.sacksConsumed, kgConsumedToday: feed.kgConsumed,
      cumulativeSacksConsumed: cumulativeSacks, cumulativeKgConsumed: cumulativeKg,
      livingChicks, avgWeightKg: parseFloat(avgWeight.toFixed(3)),
      estimatedBiomassKg: parseFloat(estimatedBiomassKg.toFixed(2)), dailyFCR,
    };
  });

  return { timeline, cumulativeSacks, cumulativeKg };
};
