const DashboardTab = () => {
  return (
    <div style={{ padding: "20px 0", fontFamily: "var(--font-primary)", color: "var(--color-text-primary)" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, marginBottom: "4px" }}>
          لوحة التحكم
        </h1>
        <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
          متابعة بيانات وإنتاجية الدورة الجارية في المزرعة
        </p>
      </div>
    </div>
  );
};

export default DashboardTab;
