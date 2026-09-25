import React from "react";
import { CalendarDays } from "lucide-react";
import { useCycleRouteInfo } from "../Hooks/useCycleRouteInfo";
import CycleNotFound from "../Layout/CycleNotFound";

const DashboardTab = () => {
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
          <CalendarDays size={22} color="var(--color-primary)" />
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>متابعة الدورة</h1>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", background: isViewingHistorical ? "rgba(79, 70, 229, 0.1)" : "rgba(16, 185, 129, 0.1)", color: isViewingHistorical ? "#6366F1" : "#10B981" }}>
            {displayCycleTitle}
          </span>
        </div>
        <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
          {cycleData ? `سلالة ${cycleData.chick_type || "غير محددة"} — تاريخ البداية: ${cycleData.started_at || "غير محدد"}` : "لا توجد دورة نشطة حالياً"}
        </p>
      </div>

      {cycleData && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div style={{ background: "var(--color-bg-card)", padding: "20px", borderRadius: "14px", border: "1px solid var(--color-border)" }}>
            <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>عدد الكتاكيت عند البداية</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "4px" }}>{cycleData.number_of_chicks?.toLocaleString() || 0} طائر</div>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "20px", borderRadius: "14px", border: "1px solid var(--color-border)" }}>
            <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>سعر الكتكوت</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "4px", color: "var(--color-primary)" }}>{cycleData.chick_price || 0} ج.م</div>
          </div>
          <div style={{ background: "var(--color-bg-card)", padding: "20px", borderRadius: "14px", border: "1px solid var(--color-border)" }}>
            <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>حالة الدورة</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: "4px", color: cycleData.is_active ? "#10B981" : "#6B7280" }}>
              {cycleData.is_active ? "نشطة الآن" : "مغلقة / أرشيف"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTab;