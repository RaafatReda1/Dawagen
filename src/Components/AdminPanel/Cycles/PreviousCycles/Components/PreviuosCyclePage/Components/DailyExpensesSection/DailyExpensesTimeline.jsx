import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./DailyExpensesTimeline.module.css";

const DailyExpensesTimeline = ({ dailyExpensesFinancials }) => {
  const total = dailyExpensesFinancials?.totalDailyExpenses || 0;
  const paid = dailyExpensesFinancials?.paidDailyExpenses || 0;
  const deferred = dailyExpensesFinancials?.deferredDailyExpenses || 0;
  const expensesList = dailyExpensesFinancials?.expensesList || [];

  const chartData = expensesList.slice(0, 20).map((e, idx) => ({
    item: e.expense_item || `بند #${idx + 1}`,
    amount: e.amount || 0,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>مصاريف المزرعة والنثريات (إجمالي: {formatEgp(total)})</div>
      <div className={styles.summary}>
        <span className={styles.paidTag}>نقداً: {formatEgp(paid)}</span>
        <span className={styles.deferredTag}>مؤجل: {formatEgp(deferred)}</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="item" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(val) => [`${val} ج.م`, "المبلغ"]} />
            <Bar dataKey="amount" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyExpensesTimeline;
