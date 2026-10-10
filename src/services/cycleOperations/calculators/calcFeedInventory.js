import { extractPaymentsSum } from "./calcPayments";

export const calcFeedInventory = (feedShipments = [], totalSacksConsumed = 0, totalKgConsumed = 0) => {
  let totalFeedPurchaseCost = 0, totalFeedPaid = 0, totalSacksPurchased = 0;

  const detailedShipments = feedShipments.map((s) => {
    const sacks = Number(s.sacks_count) || 0;
    const price = Number(s.sack_price) || 0;
    const total = sacks * price;
    const paid = extractPaymentsSum(s.payments);
    const debt = Math.max(0, total - paid);

    totalFeedPurchaseCost += total;
    totalFeedPaid += paid;
    totalSacksPurchased += sacks;

    return { ...s, calculatedTotal: total, calculatedPaid: paid, calculatedDebt: debt, hasUnpaidBalance: paid < total };
  });

  const totalFeedDebt = Math.max(0, totalFeedPurchaseCost - totalFeedPaid);
  const weightedAvgSackPrice = totalSacksPurchased > 0 ? totalFeedPurchaseCost / totalSacksPurchased : 0;
  const consumedFeedCost = totalSacksConsumed * weightedAvgSackPrice;
  const remainingSacks = Math.max(0, totalSacksPurchased - totalSacksConsumed);
  const leftoverInventoryValue = remainingSacks * weightedAvgSackPrice;

  return {
    shipments: detailedShipments,
    totalSacksPurchased,
    totalFeedPurchaseCost,
    totalFeedPaid,
    totalFeedDebt,
    totalSacksConsumed,
    totalKgConsumed,
    remainingSacks,
    weightedAvgSackPrice,
    consumedFeedCost,
    leftoverInventoryValue,
  };
};
