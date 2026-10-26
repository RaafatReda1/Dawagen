export const calculateFeedMetrics = (shipments = [], withdrawals = []) => {
  const shipmentMap = new Map(shipments.map((s) => [Number(s.id), s]));

  const purchasedSacks = shipments.reduce((sum, s) => sum + (Number(s.sacks_count) || 0), 0);
  const purchasedKg = shipments.reduce((sum, s) => sum + ((Number(s.sacks_count) || 0) * (Number(s.sack_weight) || 25)), 0);
  const totalCost = shipments.reduce((sum, s) => sum + ((Number(s.sacks_count) || 0) * (Number(s.sack_price) || 0)), 0);

  let consumedSacks = 0;
  let damagedSacks = 0;
  let consumedKg = 0;
  let damagedKg = 0;

  for (const w of withdrawals) {
    const sacks = Number(w.sacks_consumed) || 0;
    const shipment = shipmentMap.get(Number(w.food_id));
    const weightPerSack = shipment?.sack_weight || 25;
    const kg = sacks * weightPerSack;

    if (w.consumption_type === "damaged") {
      damagedSacks += sacks;
      damagedKg += kg;
    } else {
      consumedSacks += sacks;
      consumedKg += kg;
    }
  }

  const remainingSacks = Math.max(0, purchasedSacks - consumedSacks - damagedSacks);
  const remainingKg = Math.max(0, purchasedKg - consumedKg - damagedKg);

  return {
    purchasedSacks,
    purchasedKg,
    totalCost,
    consumedSacks,
    consumedKg,
    damagedSacks,
    damagedKg,
    remainingSacks,
    remainingKg,
  };
};
