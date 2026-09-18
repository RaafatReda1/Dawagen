import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import styles from './AdminLayout.module.css';
import DashboardTab from '../Tabs/DashboardTab';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '40px 0', fontFamily: 'var(--font-primary)', color: 'var(--color-text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>
    {title}
  </div>
);

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.shell}>
      {/* ── Desktop floating sidebar ── */}
      <div className={styles.sidebarCol}>
        <Sidebar />
      </div>

      {/* ── Mobile overlay sidebar ── */}
      <Sidebar mobile mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* ── Main white content card ── */}
      <div className={styles.contentCard}>
        <Header onMobileMenuOpen={() => setMobileOpen(true)} />
        <div className={styles.pageScroll}>
          <Routes>
            <Route path="/" element={<DashboardTab />} />
            <Route path="/cycles" element={<PlaceholderPage title="الدورات" />} />
            <Route path="/finances" element={<PlaceholderPage title="المالية" />} />
            <Route path="/reports" element={<PlaceholderPage title="التقارير" />} />
            <Route path="/users" element={<PlaceholderPage title="المستخدمين" />} />
            <Route path="/settings" element={<PlaceholderPage title="الإعدادات" />} />
            <Route path="*" element={<DashboardTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
