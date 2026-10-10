export const calcDailyExpensesSummary = (dailyExpenses = []) => {
  let total = 0, paid = 0, deferred = 0;
  dailyExpenses.forEach((exp) => {
    const amt = Number(exp.amount) || 0;
    total += amt;
    const isDef = exp.payment_type && (exp.payment_type.includes("آجل") || exp.payment_type.toLowerCase().includes("credit") || exp.payment_type.toLowerCase().includes("deferred"));
    if (isDef) deferred += amt;
    else paid += amt;
  });

  return {
    totalDailyExpenses: total,
    paidDailyExpenses: paid,
    deferredDailyExpenses: deferred,
    itemsCount: dailyExpenses.length,
    expensesList: dailyExpenses,
  };
};
