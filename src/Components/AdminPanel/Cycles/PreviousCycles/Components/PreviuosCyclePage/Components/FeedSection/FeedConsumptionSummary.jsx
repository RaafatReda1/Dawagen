import React, { useState } from "react";
import { Wheat } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import styles from "./FeedConsumptionSummary.module.css";

const FeedConsumptionSummary = ({ feedFinancials }) => {
  const [activeTab, setActiveTab] = useState("daily");
  const shipments = feedFinancials?.shipments || [];

  const dailyData = (feedFinancials?.dailyFCRTimeline || []).map((t) => ({ label: `يوم ${t.dayNumber}`, val: t.kgConsumedToday }));
  const shipmentData = shipments.map((s, i) => ({ label: s.feed_name || `شحنة ${i + 1}`, val: s.calculatedTotal }));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Wheat size={20} color="#1F6E56" /><span>استهلاك العلف وشحنات التوريد</span></div>
        <div className={styles.tabToggle}>
          <button className={activeTab === "daily" ? styles.tabActive : styles.tabBtn} onClick={() => setActiveTab("daily")}>الاستهلاك</button>
          <button className={activeTab === "shipments" ? styles.tabActive : styles.tabBtn} onClick={() => setActiveTab("shipments")}>الشحنات</button>
        </div>
      </div>
      <div className={styles.summaryGrid}>
        <div className={styles.statBox}><div className={styles.statLabel}>إجمالي الشكائر</div><div className={styles.statVal}>DATA HERE!</div></div>
        <div className={styles.statBox}><div className={styles.statLabel}>الوزن الإجمالي</div><div className={styles.statVal}>DATA HERE!</div></div>
        <div className={styles.statBox}><div className={styles.statLabel}>تكلفة الأعلاف</div><div className={styles.statVal}>DATA HERE!</div></div>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activeTab === "daily" ? dailyData : shipmentData}>
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="val" fill={activeTab === "daily" ? "#10B981" : "#1F6E56"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedConsumptionSummary;
