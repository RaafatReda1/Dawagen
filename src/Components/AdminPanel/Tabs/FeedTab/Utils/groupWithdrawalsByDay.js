export const groupWithdrawalsByDay = (withdrawals = [], events = [], days = []) => {
  const eventMap = new Map(events.map((e) => [Number(e.id), e]));
  const dayMap = new Map(days.map((d) => [Number(d.id), d]));
  const groups = new Map();

  withdrawals.forEach((w) => {
    const event = eventMap.get(Number(w.parent_event_id));
    const day = event ? dayMap.get(Number(event.parent_day_id)) : null;
    const dayId = day?.id ? Number(day.id) : 0;
    const dayNumber = day?.day_number ?? null;

    if (!groups.has(dayId)) {
      groups.set(dayId, {
        dayId,
        dayNumber,
        items: [],
        totalSacks: 0,
        totalKg: 0,
        hasDamaged: false,
      });
    }

    const g = groups.get(dayId);
    const sacks = Number(w.sacks_consumed) || 0;
    const sackWeight = Number(w.FeedShipments?.sack_weight) || 25;
    const totalKg = sacks * sackWeight;
    const isDamaged = w.consumption_type === "damaged";

    g.items.push({
      ...w,
      sacks,
      sackWeight,
      totalKg,
      isDamaged,
      feedName: w.FeedShipments?.feed_name || "سحب عام",
    });

    g.totalSacks += sacks;
    g.totalKg += totalKg;
    if (isDamaged) g.hasDamaged = true;
  });

  return Array.from(groups.values()).sort((a, b) => {
    if (a.dayNumber == null) return 1;
    if (b.dayNumber == null) return -1;
    return Number(a.dayNumber) - Number(b.dayNumber);
  });
};
