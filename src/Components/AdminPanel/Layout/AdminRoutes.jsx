import { Routes, Route, Navigate } from "react-router-dom";
import DashboardTab from "../Tabs/DashboardTab";

const Placeholder = ({ title }) => (
  <div style={{ padding: "40px 0" }}>
    <h1 style={{ fontFamily: "var(--font-primary)", color: "var(--color-text-primary)", fontSize: "1.8rem", fontWeight: 800 }}>{title}</h1>
  </div>
);

const renderCycleRoutes = (prefix = "/current-cycle") => (
  <>
    <Route path={prefix} element={<DashboardTab />} />
    <Route path={`${prefix}/feed`} element={<Placeholder title="العلف والواردات" />} />
    <Route path={`${prefix}/drugs`} element={<Placeholder title="الادوية والتحصينات" />} />
    <Route path={`${prefix}/export`} element={<Placeholder title="حسابات التصدير والمبيعات" />} />
    <Route path={`${prefix}/overview`} element={<Placeholder title="نظرة عامة علي الدورة" />} />
  </>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/current-cycle" replace />} />
    <Route path="/cycles" element={<Placeholder title="الدورات السابقة" />} />
    <Route path="/analytics" element={<Placeholder title="التحليلات" />} />
    {renderCycleRoutes("/current-cycle")}
    {renderCycleRoutes("/cycles/:id")}
    <Route path="*" element={<Navigate to="/current-cycle" replace />} />
  </Routes>
);

export default AdminRoutes;
