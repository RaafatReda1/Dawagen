import React from "react";
import { LayoutDashboard } from "lucide-react";
import { useCycleRouteInfo } from "../Hooks/useCycleRouteInfo";
import CycleNotFound from "../Layout/CycleNotFound";

const OverviewTab = () => {
  const { isViewingHistorical, displayCycleTitle, cycleData, loading, notFound, error, cycleIdFromUrl } =
    useCycleRouteInfo();

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>جاري تحميل البيانات...</div>;
  if (notFound || (!cycleData && isViewingHistorical)) {
    return <CycleNotFound cycleId={cycleIdFromUrl} error={error} />;
  }

  return (
    <div style={{ padding: "10px 0", fontFamily: "var(--font-primary)", color: "var(--color-text-primary)" }}>
      <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <LayoutDashboard size={22} color="var(--color-primary)" />
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>نظرة عامة والمالية</h1>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: isViewingHistorical ? "rgba(79, 70, 229, 0.1)" : "rgba(16, 185, 129, 0.1)", color: isViewingHistorical ? "#6366F1" : "#10B981" }}>
            {displayCycleTitle}
          </span>
        </div>
        <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
          {cycleData ? `سلالة ${cycleData.chick_type}` : "الملخص المالي والإنتاجي للدورة"}
        </p>
      </div>

      <div style={{ background: "var(--color-bg-card)", borderRadius: "16px", border: "1px solid var(--color-border)", padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
        <LayoutDashboard size={36} style={{ opacity: 0.5, marginBottom: "12px" }} />
        <h3 style={{ margin: "0 0 8px", color: "var(--color-text-primary)" }}>جاري تجميع المؤشرات المالية</h3>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>تظهر التقارير والأرباح النهائية عند إغلاق الدورة وحساب التكاليف كاملة.</p>
      </div>
    </div>
  );
};

export default OverviewTab;