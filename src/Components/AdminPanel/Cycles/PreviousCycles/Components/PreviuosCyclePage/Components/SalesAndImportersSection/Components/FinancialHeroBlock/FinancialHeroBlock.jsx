import React, { useMemo } from "react";
import FinancialHeroHeader from "./FinancialHeroHeader";
import SalesHeroCard from "./SalesHeroCard";
import ExpensesCard from "./ExpensesCard";
import FinancialRatioFooter from "./FinancialRatioFooter";
import styles from "./FinancialHeroBlock.module.css";

const FinancialHeroBlock = ({ revenue = 0, expenses = 0, collected = 0, receivables = 0 }) => {
  const netProfit = revenue - expenses;
  const isProfit = netProfit >= 0;
  const margin = expenses > 0 ? ((netProfit / expenses) * 100).toFixed(1) : "0";
  const coverage = expenses > 0 ? ((revenue / expenses) * 100).toFixed(0) : "100";
  const ratioText = expenses > 0 ? `${(revenue / expenses).toFixed(1)}x` : "1.0x";

  const { salesPct, expensesPct, barSalesPct, barExpensesPct } = useMemo(() => {
    const maxVal = Math.max(revenue, expenses, 1);
    const clamp = (val) => Math.min(100, Math.max(42, (val / maxVal) * 100));
    const total = Math.max(revenue + expenses, 1);
    return {
      salesPct: revenue === 0 ? 42 : clamp(revenue),
      expensesPct: expenses === 0 ? 42 : clamp(expenses),
      barSalesPct: (revenue / total) * 100,
      barExpensesPct: (expenses / total) * 100,
    };
  }, [revenue, expenses]);

  return (
    <div className={styles.container}>
      <FinancialHeroHeader isProfit={isProfit} netProfit={netProfit} margin={margin} />
      <div className={styles.stage}>
        <SalesHeroCard revenue={revenue} collected={collected} receivables={receivables} heightPct={salesPct} />
        <ExpensesCard expenses={expenses} coveragePct={coverage} ratioText={ratioText} heightPct={expensesPct} isProfit={isProfit} />
      </div>
      <FinancialRatioFooter salesPct={barSalesPct} expensesPct={barExpensesPct} ratioText={ratioText} isProfit={isProfit} />
    </div>
  );
};

export default FinancialHeroBlock;
