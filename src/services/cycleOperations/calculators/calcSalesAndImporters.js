import { processSingleSale } from "./processSingleSale";
import { groupImportersSummary } from "./groupImportersSummary";

const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

export const calcSalesAndImporters = (farmSales = [], importersList = [], initialChicks = Infinity, totalDeaths = 0) => {
  let totalSalesRevenue = 0, totalSalesCollected = 0, totalNetWeightSoldKg = 0;
  let totalGrossWeightKg = 0, totalTareWeightKg = 0, totalCratesSold = 0, totalBirdsSold = 0;
  let livingBirds = Math.max(0, initialChicks - totalDeaths);

  const processedSales = farmSales.map((sale) => {
    const processed = processSingleSale(sale, livingBirds);
    livingBirds = Math.max(0, livingBirds - processed.calculatedBirdsCount);

    totalSalesRevenue += processed.calculatedRevenue;
    totalSalesCollected += processed.calculatedCollected;
    totalNetWeightSoldKg += processed.calculatedNetWeight;
    totalGrossWeightKg += processed.calculatedGrossWeight;
    totalTareWeightKg += processed.calculatedTareWeight;
    totalCratesSold += processed.cratesCount;
    totalBirdsSold += processed.calculatedBirdsCount;

    const importerData = sale.Importers || importersList.find((imp) => Number(imp.id) === Number(sale.importer_id)) || null;
    return { ...processed, importer: importerData };
  });

  const totalSalesReceivables = r2(totalSalesRevenue - totalSalesCollected);
  const importersSummary = groupImportersSummary(processedSales, importersList);
  const averagePricePerKg = totalNetWeightSoldKg > 0 ? r2(totalSalesRevenue / totalNetWeightSoldKg) : 0;

  return {
    salesOperations: processedSales,
    importersList: importersSummary,
    totals: {
      totalGrossWeightKg: r2(totalGrossWeightKg),
      totalTareWeightKg: r2(totalTareWeightKg),
      totalNetWeightSoldKg: r2(totalNetWeightSoldKg),
      totalCratesSold,
      totalBirdsSold,
      totalSalesRevenue: r2(totalSalesRevenue),
      totalSalesCollected: r2(totalSalesCollected),
      totalSalesReceivables,
      averagePricePerKg,
      hasAnyUnpaidExporter: importersSummary.some((imp) => imp.hasUnpaidBalance),
    },
  };
};
