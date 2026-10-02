import React from "react";
import { Skull } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { formatEgp } from "../../../../../../../../utils/formatters";
import styles from "./MortalityLossChart.module.css";

const MortalityLossChart = ({ chickFinancials }) => {
  const breakdown = chickFinancials?.dailyMortalityBreakdown || [];
  const totalDeaths = chickFinancials?.totalDeaths || 0;
  const totalLoss = chickFinancials?.totalMortalityFinancialLoss || 0;

  const chartData = breakdown.map((d) => ({
    day: `يوم ${d.dayNumber}`,
    deaths: d.deathsToday,
    costPerChick: d.costPerLivingChickToday,
    lossToday: d.financialLossToday,
  }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Skull size={20} color="#DC2626" />
        <span>مخطط النافق والتكلفة المباشرة للفرخ النافق</span>
      </div>
      <div className={styles.lossSummary}>
        <span>إجمالي النافق: {totalDeaths} طائر ({chickFinancials?.mortalityPercentage || 0}%)</span>
        <span>إجمالي الخسارة المالية للنافق: {formatEgp(totalLoss)}</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(val, name) => [name === "deaths" ? `${val} طائر` : `${val} ج.م`, name === "deaths" ? "عدد النافق" : "خسارة اليوم"]} />
            <Line type="monotone" dataKey="deaths" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MortalityLossChart;
