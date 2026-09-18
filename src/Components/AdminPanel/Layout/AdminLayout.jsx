import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import styles from './AdminLayout.module.css';
import DashboardTab from '../Tabs/DashboardTab';

const PlaceholderPage = ({ title, icon }) => (
  <div style={{ padding: '40px 0' }}>
    <h1 style={{ fontFamily: 'var(--font-primary)', color: 'var(--color-text-primary)', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
      {title}
    </h1>
  </div>
);

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.shell}>
      {/* Desktop floating pill */}
      <div className={styles.sidebarCol}>
        <Sidebar />
      </div>

      {/* Mobile overlay drawer */}
      <Sidebar mobile mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Main white content card */}
      <div className={styles.contentCard}>
        <Header onMobileMenuOpen={() => setMobileOpen(true)} />
        <div className={styles.pageScroll}>
          <Routes>
            <Route path="/"         element={<DashboardTab />} />
            <Route path="/feed"     element={<PlaceholderPage title="العلف" />} />
            <Route path="/drugs"    element={<PlaceholderPage title="الادوية" />} />
            <Route path="/export"   element={<PlaceholderPage title="حسابات يوم التصدير" />} />
            <Route path="/overview" element={<PlaceholderPage title="نظرة عامة علي الدورة" />} />
            <Route path="/news"     element={<PlaceholderPage title="اخبار واحصائيات" />} />
            <Route path="*"         element={<DashboardTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
