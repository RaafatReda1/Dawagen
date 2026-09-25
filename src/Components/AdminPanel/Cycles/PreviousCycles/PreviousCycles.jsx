import React from "react";
import { Link } from "react-router-dom";
import { History, ArrowLeft, Plus } from "lucide-react";
import { useCycles } from "../Context/CycleContext";

const PreviousCycles = () => {
  const { cycles, loading, openNewModal } = useCycles();

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>جاري تحميل الدورات...</div>;
  }

  return (
    <div style={{ padding: "10px 0", fontFamily: "var(--font-primary)", color: "var(--color-text-primary)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", padding: "20px 24px", borderRadius: "16px", background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <History size={22} color="var(--color-primary)" />
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>الدورات السابقة والأرشيف</h1>
            <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "0.95rem" }}>
              استعراض بيانات وحسابات الدورات المسجلة بالمزرعة
            </p>
          </div>
        </div>
      </div>

      {cycles.length === 0 ? (
        <div style={{ background: "var(--color-bg-card)", borderRadius: "16px", border: "1px solid var(--color-border)", padding: "40px", textAlign: "center", color: "var(--color-text-secondary)" }}>
          <History size={36} style={{ opacity: 0.5, marginBottom: "12px" }} />
          <h3 style={{ margin: "0 0 8px", color: "var(--color-text-primary)" }}>لا توجد دورات مسجلة في قاعدة البيانات</h3>
          <p style={{ margin: "0 0 16px", fontSize: "0.9rem" }}>يمكنك البدء بإنشاء أول دورة جديدة للمزرعة الآن.</p>
          <button onClick={openNewModal} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "10px", backgroundColor: "var(--color-primary)", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>
            <Plus size={16} />
            <span>إضافة دورة جديدة</span>
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
          {cycles.map((cycle) => (
            <div key={cycle.id} style={{ background: "var(--color-bg-card)", borderRadius: "16px", border: "1px solid var(--color-border)", padding: "20px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--color-primary)" }}>
                    دورة #{cycle.cycle_number || cycle.id}
                  </span>
                  <span style={{ fontSize: "0.8rem", padding: "4px 10px", borderRadius: "12px", backgroundColor: cycle.is_active ? "rgba(16, 185, 129, 0.1)" : "rgba(107, 114, 128, 0.1)", color: cycle.is_active ? "#10B981" : "var(--color-text-secondary)", fontWeight: 700 }}>
                    {cycle.is_active ? "نشطة" : "مكتملة"}
                  </span>
                </div>
                <div style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                  نوع الكتكوت: <strong style={{ color: "var(--color-text-primary)" }}>{cycle.chick_type}</strong>
                </div>
                <div style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                  عدد الكتاكيت: <strong style={{ color: "var(--color-text-primary)" }}>{cycle.number_of_chicks?.toLocaleString() || 0}</strong>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "14px" }}>
                <Link to={`/cycle-${cycle.id}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", padding: "8px 12px", borderRadius: "8px", backgroundColor: "var(--color-bg-page)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
                  <span>تصفح الدورة</span>
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousCycles;