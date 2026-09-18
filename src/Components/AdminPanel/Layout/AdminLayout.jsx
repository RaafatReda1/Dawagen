    import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import styles from './AdminLayout.module.css';

// Placeholder components for tabs
const Dashboard = () => <div className={styles.page}>لوحة التحكم</div>;
const Cycles = () => <div className={styles.page}>الدورات</div>;

const AdminLayout = ({ user, signOut }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.appWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <Header user={user} signOut={signOut} />
          <div className={styles.pageContent}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cycles" element={<Cycles />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
