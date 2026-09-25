import { extractPaymentsSum, extractWeightsSum } from "./calcPayments";

/**
 * Calculates farm sales operations and groups them per importer/exporter.
 * Computes net weights, execution prices, collected payments, remaining debt,
 * and attaches a boolean flag `hasUnpaidBalance` for each importer.
 */
export const calcSalesAndImporters = (farmSales = [], importersList = []) => {
  let totalSalesRevenue = 0;
  let totalSalesCollected = 0;
  let totalNetWeightSoldKg = 0;
  let totalGrossWeightKg = 0;
  let totalTareWeightKg = 0;
  let totalCratesSold = 0;

  // Map each individual sale operation
  const processedSales = farmSales.map((sale) => {
    const grossWeight = extractWeightsSum(sale.gross_weights);
    const tareWeight = extractWeightsSum(sale.tare_weights);
    const netWeight = Math.max(0, grossWeight - tareWeight);
    const execPrice = Number(sale.execution_price) || 0;

    // Revenue calculated using net weight * execution price recorded for this specific sale
    const revenue = netWeight * execPrice;
    const collected = extractPaymentsSum(sale.payments);
    const remainingDebt = Math.max(0, revenue - collected);
    const hasUnpaidBalance = collected < revenue;

    totalSalesRevenue += revenue;
    totalSalesCollected += collected;
    totalNetWeightSoldKg += netWeight;
    totalGrossWeightKg += grossWeight;
    totalTareWeightKg += tareWeight;
    totalCratesSold += Number(sale.crates_count) || 0;

    const importerData = sale.Importers || importersList.find((imp) => Number(imp.id) === Number(sale.importer_id)) || null;

    return {
      ...sale,
      importer: importerData,
      calculatedGrossWeight: grossWeight,
      calculatedTareWeight: tareWeight,
      calculatedNetWeight: netWeight,
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

  // Initialize map with known Importers table records
  importersList.forEach((imp) => {
    importerMap.set(Number(imp.id), {
      importerInfo: imp,
      salesOperations: [],
      totalNetWeightSold: 0,
      totalRevenue: 0,
      totalPaid: 0,
      remainingDebt: 0,
      hasUnpaidBalance: false,
    });
  });

  // Assign processed sales to respective importers
  processedSales.forEach((sale) => {
    const impId = Number(sale.importer_id);
    let entry = importerMap.get(impId);

    if (!entry) {
      entry = {
        importerInfo: sale.importer || { id: impId, name: `تاجر #${impId}` },
        salesOperations: [],
        totalNetWeightSold: 0,
        totalRevenue: 0,
        totalPaid: 0,
        remainingDebt: 0,
        hasUnpaidBalance: false,
      };
      importerMap.set(impId, entry);
    }

    entry.salesOperations.push(sale);
    entry.totalNetWeightSold += sale.calculatedNetWeight;
    entry.totalRevenue += sale.calculatedRevenue;
    entry.totalPaid += sale.calculatedCollected;
    entry.remainingDebt += sale.calculatedRemainingDebt;
  });

  // Convert map to array and compute boolean `hasUnpaidBalance`
  const importersSummary = Array.from(importerMap.values()).map((imp) => {
    const hasUnpaid = imp.totalPaid < imp.totalRevenue;
    return {
      ...imp,
      hasUnpaidBalance: hasUnpaid,
      isFullyPaid: !hasUnpaid,
    };
  });

  return {
    salesOperations: processedSales,
    importersList: importersSummary,
    totals: {
      totalGrossWeightKg,
      totalTareWeightKg,
      totalNetWeightSoldKg,
      totalCratesSold,
      totalSalesRevenue,
      totalSalesCollected,
      totalSalesReceivables,
      hasAnyUnpaidExporter: importersSummary.some((imp) => imp.hasUnpaidBalance),
    },
  };
};
