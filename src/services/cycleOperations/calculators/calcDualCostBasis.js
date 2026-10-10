export const calcDualCostBasis = ({
  chickCost = 0,
  totalFeedPurchaseCost = 0,
  consumedFeedCost = 0,
  totalMedicineCost = 0,
  totalDailyExpenses = 0,
  totalSalesRevenue = 0,
  leftoverFeedInventoryValue = 0,
  remainingFeedSacks = 0,
}) => {
  const purchaseCost = chickCost + totalFeedPurchaseCost + totalMedicineCost + totalDailyExpenses;
  const purchaseNetProfit = totalSalesRevenue - purchaseCost;

  const consumptionCost = chickCost + consumedFeedCost + totalMedicineCost + totalDailyExpenses;
  const consumptionNetProfit = totalSalesRevenue - consumptionCost;

  return {
    purchaseBasis: {
      totalCost: purchaseCost,
      netProfitLoss: purchaseNetProfit,
      isProfit: purchaseNetProfit >= 0,
      coverageRatio: purchaseCost > 0 ? parseFloat((totalSalesRevenue / purchaseCost).toFixed(2)) : 1,
    },
    consumptionBasis: {
      totalCost: consumptionCost,
      netProfitLoss: consumptionNetProfit,
      isProfit: consumptionNetProfit >= 0,
      coverageRatio: consumptionCost > 0 ? parseFloat((totalSalesRevenue / consumptionCost).toFixed(2)) : 1,
    },
    inventory: {
      remainingSacks: remainingFeedSacks,
      leftoverValue: leftoverFeedInventoryValue,
      totalEconomicGain: consumptionNetProfit + leftoverFeedInventoryValue,
    },
  };
};
