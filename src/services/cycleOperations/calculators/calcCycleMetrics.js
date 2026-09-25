import { extractPaymentsSum } from "./calcPayments";
import { calcSalesAndImporters } from "./calcSalesAndImporters";
import { calcDeathsAndMortalityLoss } from "./calcDeathsAndMortalityLoss";
import { calcDailyFCR } from "./calcDailyFCR";

/**
 * Master Aggregator Engine for Cycle Calculations
 * Combines all sub-calculators into a comprehensive structured result.
 */
export const calculateCycleMetrics = (rawData) => {
  if (!rawData || !rawData.cycle) {
    return null;
  }

  const {
    cycle,
    days = [],
    events = [],
    dailyExpenses = [],
    drugWithdrawals = [],
    foodWithdrawals = [],
    followUpData = [],
    medicineInvoices = [],
    feedShipments = [],
    farmSales = [],
    importers = [],
    diseases = [],
  } = rawData;

  // Build Diseases lookup Map
  const diseasesMap = new Map();
  diseases.forEach((dis) => {
    diseasesMap.set(Number(dis.id), dis);
  });

  // 1. Initial Chick Financials
  const numberOfChicks = Number(cycle.number_of_chicks) || 0;
  const chickPrice = Number(cycle.chick_price) || 0;
  const chickCost = numberOfChicks * chickPrice;

  // 2. Daily Expenses Breakdown
  let totalDailyExpenses = 0;
  let paidDailyExpenses = 0;
  let deferredDailyExpenses = 0;

  dailyExpenses.forEach((exp) => {
    const amt = Number(exp.amount) || 0;
    totalDailyExpenses += amt;
    const isDeferred =
      exp.payment_type &&
      (exp.payment_type.includes("آجل") ||
        exp.payment_type.toLowerCase().includes("credit") ||
        exp.payment_type.toLowerCase().includes("deferred"));

    if (isDeferred) {
      deferredDailyExpenses += amt;
    } else {
      paidDailyExpenses += amt;
    }
  });

  // 3. Medicine Invoices & Suppliers
  let totalMedicineCost = 0;
  let totalMedicinePaid = 0;

  const detailedMedicineInvoices = medicineInvoices.map((inv) => {
    const invTotal = Number(inv.total_price) || 0;
    const invPaid = extractPaymentsSum(inv.payments);
    const invDebt = Math.max(0, invTotal - invPaid);

    totalMedicineCost += invTotal;
    totalMedicinePaid += invPaid;

    return {
      ...inv,
      calculatedTotal: invTotal,
      calculatedPaid: invPaid,
      calculatedDebt: invDebt,
      hasUnpaidBalance: invPaid < invTotal,
    };
  });

  const totalMedicineDebt = Math.max(0, totalMedicineCost - totalMedicinePaid);

  // 4. Feed Shipments & Suppliers
  let totalFeedCost = 0;
  let totalFeedPaid = 0;
  let totalFeedSacksPurchased = 0;

  const detailedFeedShipments = feedShipments.map((shipment) => {
    const sacksCount = Number(shipment.sacks_count) || 0;
    const sackPrice = Number(shipment.sack_price) || 0;
    const shipmentTotal = sacksCount * sackPrice;
    const shipmentPaid = extractPaymentsSum(shipment.payments);
    const shipmentDebt = Math.max(0, shipmentTotal - shipmentPaid);

    totalFeedCost += shipmentTotal;
    totalFeedPaid += shipmentPaid;
    totalFeedSacksPurchased += sacksCount;

    return {
      ...shipment,
      calculatedTotal: shipmentTotal,
      calculatedPaid: shipmentPaid,
      calculatedDebt: shipmentDebt,
      hasUnpaidBalance: shipmentPaid < shipmentTotal,
    };
  });

  const totalFeedDebt = Math.max(0, totalFeedCost - totalFeedPaid);

  // 5. Sales & Importers Sub-Calculator
  const salesAndImportersResult = calcSalesAndImporters(farmSales, importers);

  // 6. Mortality & Daily Chick Loss Sub-Calculator
  const mortalityResult = calcDeathsAndMortalityLoss(
    cycle,
    days,
    events,
    dailyExpenses,
    feedShipments,
    medicineInvoices,
    diseasesMap
  );

  // 7. Daily FCR & Feed Sub-Calculator
  const fcrResult = calcDailyFCR(
    days,
    events,
    foodWithdrawals,
    feedShipments,
    followUpData,
    mortalityResult.dailyMortalityBreakdown
  );

  // 8. Overall Summary Financial Indicators (Matching Wireframe UI)
  const totalCycleCost = chickCost + totalFeedCost + totalMedicineCost + totalDailyExpenses; // الدوره متكلفه شاكب راكب
  const outOfPocketPaid = chickCost + paidDailyExpenses + totalMedicinePaid + totalFeedPaid; // انت دفعت من جيبك خلال الدوره
  const totalSalesRevenue = salesAndImportersResult.totals.totalSalesRevenue; // الدوره باعت شاكب راكب
  const totalSalesCollected = salesAndImportersResult.totals.totalSalesCollected;
  const cashInBox = totalSalesCollected - outOfPocketPaid; // دخل جيبك لحد دلوقتي ف الصندوق
  const debtsOwed = totalMedicineDebt + totalFeedDebt + deferredDailyExpenses; // باقي عليك ديون
  const receivablesOwed = salesAndImportersResult.totals.totalSalesReceivables; // باقي عند التجار برا
  const netProfitLoss = totalSalesRevenue - totalCycleCost; // كسبان / خسران

  return {
    cycleId: cycle.id,
    displayTitle: `الدورة رقم ${cycle.id}`,
    isActive: cycle.is_active,
    startedAt: cycle.started_at || cycle.created_at,
    endedAt: cycle.ended_at,
    chickType: cycle.chick_type,

    // Summary Wireframe Cards
    cards: {
      outOfPocketPaid,
      cashInBox,
      debtsOwed,
      receivablesOwed,
      totalCycleCost,
      totalSalesRevenue,
      netProfitLoss,
      isProfit: netProfitLoss >= 0,
    },

    // Category Breakdown
    chickFinancials: {
      numberOfChicks,
      chickPrice,
      chickCost,
      totalDeaths: mortalityResult.totalDeaths,
      finalLivingChicks: mortalityResult.finalLivingChicks,
      mortalityPercentage: mortalityResult.mortalityPercentage,
      totalMortalityFinancialLoss: mortalityResult.totalMortalityFinancialLoss,
      dailyMortalityBreakdown: mortalityResult.dailyMortalityBreakdown,
    },

    dailyExpensesFinancials: {
      totalDailyExpenses,
      paidDailyExpenses,
      deferredDailyExpenses,
      itemsCount: dailyExpenses.length,
      expensesList: dailyExpenses,
    },

    medicineFinancials: {
      totalMedicineCost,
      totalMedicinePaid,
      totalMedicineDebt,
      invoicesCount: medicineInvoices.length,
      invoices: detailedMedicineInvoices,
    },

    feedFinancials: {
      totalFeedCost,
      totalFeedPaid,
      totalFeedDebt,
      totalSacksPurchased: totalFeedSacksPurchased,
      totalSacksConsumed: fcrResult.totalSacksConsumed,
      totalKgConsumed: fcrResult.totalKgConsumed,
      finalFCR: fcrResult.finalFCR,
      dailyFCRTimeline: fcrResult.dailyFCRTimeline,
      shipmentsCount: feedShipments.length,
      shipments: detailedFeedShipments,
    },

    salesFinancials: {
      totalSalesRevenue,
      totalSalesCollected,
      totalSalesReceivables: receivablesOwed,
      totalGrossWeightKg: salesAndImportersResult.totals.totalGrossWeightKg,
      totalTareWeightKg: salesAndImportersResult.totals.totalTareWeightKg,
      totalNetWeightSoldKg: salesAndImportersResult.totals.totalNetWeightSoldKg,
      totalCratesSold: salesAndImportersResult.totals.totalCratesSold,
      salesOperations: salesAndImportersResult.salesOperations,
      importersList: salesAndImportersResult.importersList,
      hasAnyUnpaidExporter: salesAndImportersResult.totals.hasAnyUnpaidExporter,
    },

    raw: rawData,
  };
};
