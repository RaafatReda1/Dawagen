import React from "react";
import { History } from "lucide-react";
import { useCycles } from "../../../../context/CycleContext";
import CycleCard from "./Components/CycleCard/CycleCard";

const sampleCycles = [
  { id: 15, chick_type: "Cobb 500", started_at: "2026-09-14", ended_at: "2026-10-27", is_active: false },
  { id: 14, chick_type: "Ross 308", started_at: "2026-07-01", ended_at: "2026-08-12", is_active: false },
  { id: 13, chick_type: "Arbor Acres", started_at: "2026-04-10", ended_at: "2026-05-22", is_active: false },
];

const PreviousCycles = () => {
  const { cycles } = useCycles();
  const displayCycles = cycles && cycles.length > 0 ? cycles : sampleCycles;

  return (
    <div style={{ padding: "10px 0", fontFamily: "var(--font-primary)", color: "var(--color-text-primary)", direction: "rtl" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "var(--color-bg-card, #ffffff)",
          border: "1px solid var(--color-border, #e5e7eb)",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#D1FAE5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1F6E56",
          }}
        >
          <History size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, color: "#111827" }}>الدورات السابقة والأرشيف</h1>
          <p style={{ color: "#6B7280", margin: 0, fontSize: "0.95rem" }}>
            استعراض بيانات وحسابات الدورات السابقة والمكتملة
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
        {displayCycles.map((cycle) => (
          <CycleCard key={cycle.id} cycle={cycle} />
        ))}
      </div>
    </div>
  );
};

export default PreviousCycles;