import React from "react";
import { Skull } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import styles from "./MortalityLossChart.module.css";

const MortalityLossChart = ({ chickFinancials }) => {
  const breakdown = chickFinancials?.dailyMortalityBreakdown || [];

  const chartData = breakdown.map((d) => ({
    day: `يوم ${d.dayNumber}`,
    deaths: d.deathsToday,
    lossToday: d.financialLossToday,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Skull size={20} color="#DC2626" />
        <span>مخطط النافق والتكلفة المباشرة للفرخ النافق</span>
      </div>
      <div className={styles.lossSummary}>
        <span>إجمالي النافق: DATA HERE!</span>
        <span>إجمالي الخسارة المالية للنافق: DATA HERE!</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="deaths" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MortalityLossChart;
