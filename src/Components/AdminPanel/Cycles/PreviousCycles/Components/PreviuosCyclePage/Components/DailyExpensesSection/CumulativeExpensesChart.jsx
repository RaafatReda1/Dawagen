import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./CumulativeExpensesChart.module.css";

const CumulativeExpensesChart = ({ dailyExpensesFinancials, chickFinancials }) => {
  const total = dailyExpensesFinancials?.totalDailyExpenses || 0;
  const paid = dailyExpensesFinancials?.paidDailyExpenses || 0;
  const deferred = dailyExpensesFinancials?.deferredDailyExpenses || 0;
  const mortalityBreakdown = chickFinancials?.dailyMortalityBreakdown || [];

  const chartData = mortalityBreakdown.map((m) => ({
    day: `يوم ${m.dayNumber}`,
    cumCost: m.cumulativeExpensesUpToDay,
    cumLoss: m.cumulativeFinancialMortalityLoss,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>معدل نمو التكاليف التراكمية للمزرعة (إجمالي المصاريف: {formatEgp(total)})</div>
      <div className={styles.summary}>
        <span className={styles.paidTag}>نقداً: {formatEgp(paid)}</span>
        <span className={styles.deferredTag}>مؤجل: {formatEgp(deferred)}</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(val, name) => [formatEgp(val), name === "cumCost" ? "إجمالي التكلفة التراكمية" : "إجمالي خسارة النافق التراكمية"]} />
            <Line type="monotone" dataKey="cumCost" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="cumLoss" stroke="#EF4444" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CumulativeExpensesChart;
