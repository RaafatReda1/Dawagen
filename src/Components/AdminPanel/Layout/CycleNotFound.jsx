import React from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CycleNotFound = ({ cycleId, error }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "var(--font-primary)" }}>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "32px 24px",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.1)",
            color: "#EF4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <AlertTriangle size={28} />
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 8px" }}>
          الدورة غير موجودة
        </h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", margin: "0 0 20px" }}>
          {error || `لم يتم العثور على أي سجلات للدورة رقم #${cycleId} في قاعدة البيانات.`}
        </p>
        <button
          onClick={() => navigate("/current-cycle")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          <span>العودة للدورة الحالية</span>
          <ArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default CycleNotFound;
