import { calcSalesAndImporters } from "./calcSalesAndImporters";
import { calcDeathsAndMortalityLoss } from "./calcDeathsAndMortalityLoss";
import { calcDailyFCR } from "./calcDailyFCR";
import { calcFeedInventory } from "./calcFeedInventory";
import { calcTrueFCR } from "./calcTrueFCR";
import { calcDualCostBasis } from "./calcDualCostBasis";
import { calcMedicineSummary } from "./calcMedicineSummary";
import { calcDailyExpensesSummary } from "./calcDailyExpensesSummary";

export const calculateCycleMetrics = (rawData) => {
  if (!rawData || !rawData.cycle) return null;
  const { cycle, days = [], events = [], dailyExpenses = [], foodWithdrawals = [], followUpData = [], medicineInvoices = [], feedShipments = [], farmSales = [], importers = [], diseases = [] } = rawData;

  const numberOfChicks = Number(cycle.number_of_chicks) || 0;
  const chickPrice = Number(cycle.chick_price) || 0;
  const chickCost = numberOfChicks * chickPrice;

  const diseasesMap = new Map(diseases.map((d) => [Number(d.id), d]));
  const mortality = calcDeathsAndMortalityLoss(cycle, days, events, dailyExpenses, feedShipments, medicineInvoices, diseasesMap);
  const fcr = calcDailyFCR(days, events, foodWithdrawals, feedShipments, followUpData, mortality.dailyMortalityBreakdown);
  const sales = calcSalesAndImporters(farmSales, importers, numberOfChicks, mortality.totalDeaths);
  const feed = calcFeedInventory(feedShipments, fcr.totalSacksConsumed, fcr.totalKgConsumed);
  const med = calcMedicineSummary(medicineInvoices);
  const daily = calcDailyExpensesSummary(dailyExpenses);

  const trueFcr = calcTrueFCR(fcr.totalKgConsumed, numberOfChicks, sales.totals.totalNetWeightSoldKg, mortality.finalLivingChicks);
  const costBasis = calcDualCostBasis({
    chickCost, totalFeedPurchaseCost: feed.totalFeedPurchaseCost, consumedFeedCost: feed.consumedFeedCost,
    totalMedicineCost: med.totalMedicineCost, totalDailyExpenses: daily.totalDailyExpenses,
    totalSalesRevenue: sales.totals.totalSalesRevenue, leftoverFeedInventoryValue: feed.leftoverInventoryValue, remainingFeedSacks: feed.remainingSacks,
  });

  const debtsOwed = med.totalMedicineDebt + feed.totalFeedDebt + daily.deferredDailyExpenses;
  const outOfPocketPaid = chickCost + daily.paidDailyExpenses + med.totalMedicinePaid + feed.totalFeedPaid;

  const feedFinancials = { ...feed, totalFeedCost: feed.totalFeedPurchaseCost, shipmentsCount: feedShipments.length, finalFCR: trueFcr.biologicalFCR || fcr.finalFCR, biologicalFCR: trueFcr.biologicalFCR, dailyFCRTimeline: fcr.dailyFCRTimeline };
  const salesFinancials = { ...sales.totals, salesOperations: sales.salesOperations, importersList: sales.importersList };

  return {
    cycleId: cycle.id, displayTitle: `الدورة رقم ${cycle.id}`, isActive: cycle.is_active,
    startedAt: cycle.started_at || cycle.created_at, endedAt: cycle.ended_at, chickType: cycle.chick_type,
    cards: { outOfPocketPaid, cashInBox: sales.totals.totalSalesCollected - outOfPocketPaid, debtsOwed, receivablesOwed: sales.totals.totalSalesReceivables, totalCycleCost: costBasis.purchaseBasis.totalCost, totalSalesRevenue: sales.totals.totalSalesRevenue, netProfitLoss: costBasis.purchaseBasis.netProfitLoss, isProfit: costBasis.purchaseBasis.isProfit },
    chickFinancials: { numberOfChicks, chickPrice, chickCost, ...mortality },
    dailyExpensesFinancials: daily, medicineFinancials: med, feedFinancials, salesFinancials, costBasis, raw: rawData,
  };
};
