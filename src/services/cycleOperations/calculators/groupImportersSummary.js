const createImporterEntry = (info) => ({
  importerInfo: info,
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

export const groupImportersSummary = (processedSales = [], importersList = []) => {
  const map = new Map();
  importersList.forEach((imp) => map.set(Number(imp.id), createImporterEntry(imp)));

  processedSales.forEach((sale) => {
    const id = Number(sale.importer_id);
    if (!map.has(id)) {
      map.set(id, createImporterEntry(sale.importer || { id, name: `تاجر #${id}` }));
    }
    const entry = map.get(id);
    entry.salesOperations.push(sale);
    entry.totalNetWeightSold += sale.calculatedNetWeight;
    entry.totalGrossWeight += sale.calculatedGrossWeight;
    entry.totalTareWeight += sale.calculatedTareWeight;
    entry.totalBirdsSold += sale.calculatedBirdsCount;
    entry.totalCratesSold += sale.cratesCount;
    entry.totalRevenue += sale.calculatedRevenue;
    entry.totalPaid += sale.calculatedCollected;
    entry.remainingDebt += sale.calculatedRemainingDebt;
    entry.hasUnpaidBalance = entry.remainingDebt > 0;
  });

  return Array.from(map.values()).filter((i) => i.salesOperations.length > 0 || i.totalRevenue > 0);
};
