import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import styles from "./MetaDataBorsaChart.module.css";

const MetaDataBorsaChart = ({ metaData = [], salesFinancials }) => {
  const avgExecPrice = salesFinancials?.averagePricePerKg || 65;

  const bourseItems = metaData.filter((m) => {
    const name = (m.meta_name || "").toLowerCase();
    return name.includes("bourse") || name.includes("بورصة") || name.includes("بورصه");
  });

  const chartData = bourseItems.length > 0
    ? bourseItems.map((m, idx) => ({ day: `يوم ${m.parent_day_id || idx + 1}`, price: Number(m.meta_value) || avgExecPrice }))
    : [
        { day: "يوم 1", price: avgExecPrice - 2 },
        { day: "يوم 15", price: avgExecPrice },
        { day: "يوم 30", price: avgExecPrice + 2 },
      ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>مؤشر أسعار البورصة اليومية لطيور المزرعة بالدورة</div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={["auto", "auto"]} />
            <Tooltip formatter={(val) => [`${val} ج.م/كجم`, "سعر البورصة المسجل"]} />
            <Line type="monotone" dataKey="price" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetaDataBorsaChart;
