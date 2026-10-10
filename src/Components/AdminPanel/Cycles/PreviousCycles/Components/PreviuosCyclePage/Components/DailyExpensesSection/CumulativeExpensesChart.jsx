import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import styles from "./CumulativeExpensesChart.module.css";

const CumulativeExpensesChart = ({ chickFinancials }) => {
  const mortalityBreakdown = chickFinancials?.dailyMortalityBreakdown || [];

  const chartData = mortalityBreakdown.map((m) => ({
    day: `يوم ${m.dayNumber}`,
    cumCost: m.cumulativeExpensesUpToDay,
    cumLoss: m.cumulativeFinancialMortalityLoss,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>معدل نمو التكاليف التراكمية للمزرعة (إجمالي المصاريف: DATA HERE!)</div>
      <div className={styles.summary}>
        <span className={styles.paidTag}>نقداً: DATA HERE!</span>
        <span className={styles.deferredTag}>مؤجل: DATA HERE!</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="cumCost" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="cumLoss" stroke="#EF4444" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CumulativeExpensesChart;
