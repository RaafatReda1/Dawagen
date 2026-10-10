import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import styles from "./TraderHistoryChart.module.css";

const TraderHistoryChart = ({ chartData }) => {
  if (!chartData || chartData.length === 0) return null;

  return (
    <div className={styles.chartWrapper}>
      <h4 className={styles.chartTitle}>مقارنة التعاملات المالية والمدفوعات الزمني</h4>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(val, name) => [`${Math.round(Number(val) || 0).toLocaleString()} EGP`, name]}
              contentStyle={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", color: "#0f172a", fontSize: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="total" name="القيمة الكلية" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="paid" name="المبلغ المدفوع" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TraderHistoryChart;
