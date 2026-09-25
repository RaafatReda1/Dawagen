import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardTab from "../Tabs/DashboardTab";
import FeedTab from "../Tabs/FeedTab";
import DrugsTab from "../Tabs/DrugsTab";
import ExportTab from "../Tabs/ExportTab";
import OverviewTab from "../Tabs/OverviewTab";
import PreviousCycles from "../Cycles/PreviousCycles/PreviousCycles";
import Analytics from "../Cycles/Analytics/Analytics";

const renderCycleRoutes = (prefix) => (
  <React.Fragment key={prefix}>
    <Route path={prefix} element={<DashboardTab />} />
    <Route path={`${prefix}/feed`} element={<FeedTab />} />
    <Route path={`${prefix}/drugs`} element={<DrugsTab />} />
    <Route path={`${prefix}/export`} element={<ExportTab />} />
    <Route path={`${prefix}/overview`} element={<OverviewTab />} />
  </React.Fragment>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/current-cycle" replace />} />
    <Route path="/cycles" element={<PreviousCycles />} />
    <Route path="/analytics" element={<Analytics />} />

    {/* Dedicated routes for /current-cycle */}
    {renderCycleRoutes("/current-cycle")}

    {/* Dedicated routes for /cycles/:id */}
    {renderCycleRoutes("/cycles/:id")}

    {/* Dedicated routes for /cycle/:id */}
    {renderCycleRoutes("/cycle/:id")}

    {/* Catch-all slug routes like /current-10, /cycle-10, etc. */}
    {renderCycleRoutes("/:cycleSlug")}

    <Route path="*" element={<Navigate to="/current-cycle" replace />} />
  </Routes>
);

export default AdminRoutes;
