import { extractPaymentsSum, extractWeightsSum } from "./calcPayments";

/**
 * Calculates farm sales operations and groups them per importer/exporter.
 * Computes net weights, execution prices, collected payments, remaining debt,
 * birds count (crates_count * crate_capacity), and filters out importers with 0 operations in this cycle.
 */
export const calcSalesAndImporters = (farmSales = [], importersList = []) => {
  let totalSalesRevenue = 0;
  let totalSalesCollected = 0;
  let totalNetWeightSoldKg = 0;
  let totalGrossWeightKg = 0;
  let totalTareWeightKg = 0;
  let totalCratesSold = 0;
  let totalBirdsSold = 0;

  const validPrices = [];

  const processedSales = farmSales.map((sale) => {
    let grossWeight = extractWeightsSum(sale.gross_weights);
    let tareWeight = extractWeightsSum(sale.tare_weights);
    let netWeight = Math.max(0, grossWeight - tareWeight);

    const cratesCount = Number(sale.crates_count) || 0;
    const crateCap = Number(sale.crate_capacity) || 0;
    const calculatedBirdsCount = Number(sale.chick_count || sale.bird_count || 0) || (cratesCount * crateCap);

    if (netWeight === 0 && cratesCount > 0 && crateCap > 0) {
      netWeight = cratesCount * crateCap * 2;
    }

    const execPrice = Number(sale.execution_price) || 0;
    if (execPrice > 0) validPrices.push(execPrice);

    const revenue = netWeight * execPrice;
    const collected = extractPaymentsSum(sale.payments);
    const remainingDebt = Math.max(0, revenue - collected);
    const hasUnpaidBalance = collected < revenue;

    totalSalesRevenue += revenue;
    totalSalesCollected += collected;
    totalNetWeightSoldKg += netWeight;
    totalGrossWeightKg += grossWeight;
    totalTareWeightKg += tareWeight;
    totalCratesSold += cratesCount;
    totalBirdsSold += calculatedBirdsCount;

    const importerData = sale.Importers || importersList.find((imp) => Number(imp.id) === Number(sale.importer_id)) || null;

    return {
      ...sale,
      importer: importerData,
      calculatedGrossWeight: grossWeight,
      calculatedTareWeight: tareWeight,
      calculatedNetWeight: netWeight,
      calculatedBirdsCount,
      cratesCount,
      crateCapacity: crateCap,
      executionPrice: execPrice,
      calculatedRevenue: revenue,
      calculatedCollected: collected,
      calculatedRemainingDebt: remainingDebt,
      hasUnpaidBalance,
      isFullyPaid: !hasUnpaidBalance,
    };
  });

  const totalSalesReceivables = Math.max(0, totalSalesRevenue - totalSalesCollected);

  // Group operations by Importer
  const importerMap = new Map();

  importersList.forEach((imp) => {
    importerMap.set(Number(imp.id), {
      importerInfo: imp,
      salesOperations: [],
      totalNetWeightSold: 0,
      totalGrossWeight: 0,
      totalTareWeight: 0,
      totalBirdsSold: 0,
      totalCratesSold: 0,
      totalRevenue: 0,
      totalPaid: 0,
      remainingDebt: 0,
      hasUnpaidBalance: false,
    });
  });

  processedSales.forEach((sale) => {
    const impId = Number(sale.importer_id);
    let entry = importerMap.get(impId);

    if (!entry) {
      entry = {
        importerInfo: sale.importer || { id: impId, name: `تاجر #${impId}` },
        salesOperations: [],
        totalNetWeightSold: 0,
        totalGrossWeight: 0,
        totalTareWeight: 0,
        totalBirdsSold: 0,
        totalCratesSold: 0,
        totalRevenue: 0,
        totalPaid: 0,
        remainingDebt: 0,
        hasUnpaidBalance: false,
      };
      importerMap.set(impId, entry);
    }

    entry.salesOperations.push(sale);
    entry.totalNetWeightSold += sale.calculatedNetWeight;
    entry.totalGrossWeight += sale.calculatedGrossWeight;
    entry.totalTareWeight += sale.calculatedTareWeight;
    entry.totalBirdsSold += sale.calculatedBirdsCount;
    entry.totalCratesSold += sale.cratesCount;
    entry.totalRevenue += sale.calculatedRevenue;
    entry.totalPaid += sale.calculatedCollected;
    entry.remainingDebt += sale.calculatedRemainingDebt;
  });

  const importersSummary = Array.from(importerMap.values())
    .filter((imp) => imp.salesOperations.length > 0 || imp.totalRevenue > 0 || imp.totalPaid > 0)
    .map((imp) => {
      const hasUnpaid = imp.totalPaid < imp.totalRevenue;
      return {
        ...imp,
        hasUnpaidBalance: hasUnpaid,
        isFullyPaid: !hasUnpaid,
      };
    });

  let averagePricePerKg = 0;
  if (totalNetWeightSoldKg > 0 && totalSalesRevenue > 0) {
    averagePricePerKg = totalSalesRevenue / totalNetWeightSoldKg;
  } else if (validPrices.length > 0) {
    averagePricePerKg = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;
  }

  return {
    salesOperations: processedSales,
    importersList: importersSummary,
    totals: {
      totalGrossWeightKg,
      totalTareWeightKg,
      totalNetWeightSoldKg,
      totalCratesSold,
      totalBirdsSold,
      totalSalesRevenue,
      totalSalesCollected,
      totalSalesReceivables,
      averagePricePerKg: parseFloat(averagePricePerKg.toFixed(1)),
      hasAnyUnpaidExporter: importersSummary.some((imp) => imp.hasUnpaidBalance),
    },
  };
};
