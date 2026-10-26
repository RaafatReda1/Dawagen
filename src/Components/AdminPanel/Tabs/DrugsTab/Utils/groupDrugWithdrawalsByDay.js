export const groupDrugWithdrawalsByDay = (withdrawals = [], events = [], days = []) => {
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
        totalPackages: 0,
        totalCapacity: 0,
      });
    }

    const g = groups.get(dayId);
    const pkgs = Number(w.packages_count) || 0;
    const capacity = Number(w.consumed_capacity) || 0;

    g.items.push({
      ...w,
      packagesCount: pkgs,
      consumedCapacity: capacity,
      drugName: w.Medicine?.name || "علاج غير محدد",
      measurementType: w.Medicine?.measurement_type || "مل",
    });

    g.totalPackages += pkgs;
    g.totalCapacity += capacity;
  });

  return Array.from(groups.values()).sort((a, b) => {
    if (a.dayNumber == null) return 1;
    if (b.dayNumber == null) return -1;
    return Number(a.dayNumber) - Number(b.dayNumber);
  });
};
