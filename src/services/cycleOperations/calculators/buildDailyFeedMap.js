export const buildDailyFeedMap = (foodWithdrawals = [], eventsById = new Map(), feedShipmentsMap = new Map()) => {
  const map = new Map();

  foodWithdrawals.forEach((fw) => {
    const parentEvent = eventsById.get(Number(fw.parent_event_id));
    if (!parentEvent) return;

    const dayId = Number(parentEvent.parent_day_id);
    const shipment = feedShipmentsMap.get(Number(fw.food_id)) || fw.FeedShipments || null;
    const sacks = Number(fw.sacks_consumed) || 0;
    const sackWeightKg = shipment ? Number(shipment.sack_weight) || 0 : 0;
    const kg = sacks * sackWeightKg;

    const cur = map.get(dayId) || { sacksConsumed: 0, kgConsumed: 0, withdrawalsList: [] };
    cur.sacksConsumed += sacks;
    cur.kgConsumed += kg;
    cur.withdrawalsList.push({
      ...fw,
      shipmentFeedName: shipment?.feed_name || null,
      sackWeightKg,
      calculatedKg: kg,
    });
    map.set(dayId, cur);
  });

  return map;
};
