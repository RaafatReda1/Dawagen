import React from "react";
import { History } from "lucide-react";
import useCyclesPageLoader from "../../../../hooks/useCyclesPageLoader";
import CycleCard from "./Components/CycleCard/CycleCard";
import CycleLoader from "./Components/CycleLoader/CycleLoader";

const PreviousCycles = () => {
  const { isLoading, progress, stepMessage, cycles, allMetricsMap } = useCyclesPageLoader();

  if (isLoading) {
    return <CycleLoader progress={progress} stepMessage={stepMessage} />;
  }

  return (
    <div style={{ padding: "10px 0", fontFamily: "var(--font-primary)", color: "var(--color-text-primary)", direction: "rtl" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", padding: "20px 24px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e5e7eb" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#1F6E56" }}>
          <History size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, color: "#111827" }}>الدورات السابقة والأرشيف</h1>
          <p style={{ color: "#6B7280", margin: 0, fontSize: "0.95rem" }}>استعراض بيانات وحسابات الدورات السابقة والمكتملة</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
        {cycles.map((cycle) => (
          <CycleCard key={cycle.id} cycle={cycle} metrics={allMetricsMap[cycle.id]} />
        ))}
      </div>
    </div>
  );
};

export default PreviousCycles;