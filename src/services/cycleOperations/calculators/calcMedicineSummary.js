import { extractPaymentsSum } from "./calcPayments";

export const calcMedicineSummary = (medicineInvoices = []) => {
  let totalCost = 0, totalPaid = 0;
  const detailed = medicineInvoices.map((inv) => {
    const total = Number(inv.total_price) || 0;
    const paid = extractPaymentsSum(inv.payments);
    const debt = Math.max(0, total - paid);
    totalCost += total;
    totalPaid += paid;
    return { ...inv, calculatedTotal: total, calculatedPaid: paid, calculatedDebt: debt, hasUnpaidBalance: paid < total };
  });

  return {
    totalMedicineCost: totalCost,
    totalMedicinePaid: totalPaid,
    totalMedicineDebt: Math.max(0, totalCost - totalPaid),
    invoicesCount: medicineInvoices.length,
    invoices: detailed,
  };
};
