import { extractPaymentsSum, extractWeightsSum } from "./calcPayments";

const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

export const processSingleSale = (sale, livingBirds = Infinity) => {
  const grossWeight = r2(extractWeightsSum(sale.gross_weights));
  const tareWeight = r2(extractWeightsSum(sale.tare_weights));
  const netWeight = r2(Math.max(0, grossWeight - tareWeight));

  const cratesCount = Number(sale.crates_count) || 0;
  const crateCap = Number(sale.crate_capacity) || 0;
  const explicitBirds = Number(sale.birds_count ?? sale.bird_count ?? sale.chick_count);
  const rawBirds = explicitBirds > 0 ? explicitBirds : cratesCount * crateCap;
  const calculatedBirdsCount = Math.min(rawBirds, Math.max(0, livingBirds));

  const execPrice = Number(sale.execution_price) || 0;
  const calculatedRevenue = r2(netWeight * execPrice);
  const collected = r2(extractPaymentsSum(sale.payments));
  const remainingDebt = r2(calculatedRevenue - collected);

  return {
    ...sale,
    calculatedGrossWeight: grossWeight,
    calculatedTareWeight: tareWeight,
    calculatedNetWeight: netWeight,
    calculatedBirdsCount,
    cratesCount,
    crateCapacity: crateCap,
    executionPrice: execPrice,
    calculatedRevenue,
    calculatedCollected: collected,
    calculatedRemainingDebt: remainingDebt,
    hasUnpaidBalance: remainingDebt > 0,
    isFullyPaid: remainingDebt <= 0,
  };
};
