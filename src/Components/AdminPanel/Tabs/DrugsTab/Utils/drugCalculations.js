export const calculateDrugsMetrics = (invoices = [], withdrawals = []) => {
  let totalCost = 0;
  let totalPaid = 0;

  invoices.forEach((inv) => {
    const cost = Number(inv.total_price) || 0;
    totalCost += cost;
    const paid = (inv.payments || []).reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
    totalPaid += paid;
  });

  const remainingDebt = Math.max(0, totalCost - totalPaid);

  return {
    totalCost,
    totalPaid,
    remainingDebt,
    invoicesCount: invoices.length,
    withdrawalsCount: withdrawals.length,
  };
};
