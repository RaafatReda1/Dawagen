import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import styles from "./AdminLayout.module.css";
import DashboardTab from "../Tabs/DashboardTab";
import NewCycleModal from "../Cycles/Modals/NewCycleModal/NewCycleModal";

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: "40px 0" }}>
    <h1
      style={{
        fontFamily: "var(--font-primary)",
        color: "var(--color-text-primary)",
        fontSize: "1.8rem",
        fontWeight: 800,
        margin: 0,
      }}
    >
      {title}
    </h1>
  </div>
);

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className={styles.shell}>
        <div className={styles.sidebarCol}>
          <Sidebar />
        </div>

        <Sidebar
          mobile
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className={styles.contentCard}>
          <Header onMobileMenuOpen={() => setMobileOpen(true)} />
          <div className={styles.pageScroll}>
            <Routes>
              <Route path="/" element={<DashboardTab />} />
              <Route path="/feed" element={<PlaceholderPage title="العلف" />} />
              <Route
                path="/drugs"
                element={<PlaceholderPage title="الادوية" />}
              />
              <Route
                path="/export"
                element={<PlaceholderPage title="حسابات يوم التصدير" />}
              />
              <Route
                path="/overview"
                element={<PlaceholderPage title="نظرة عامة علي الدورة" />}
              />
              <Route
                path="/news"
                element={<PlaceholderPage title="اخبار واحصائيات" />}
              />
              <Route path="*" element={<DashboardTab />} />
            </Routes>
          </div>
        </div>
      </div>
      <NewCycleModal />
    </>
  );
};

export default AdminLayout;
