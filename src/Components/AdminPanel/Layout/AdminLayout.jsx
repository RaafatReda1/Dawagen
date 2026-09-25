import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import AdminRoutes from "./AdminRoutes";
import NewCycleModal from "../Cycles/Modals/NewCycleModal/NewCycleModal";
import styles from "./AdminLayout.module.css";

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
            <AdminRoutes />
          </div>
        </div>
      </div>
      <NewCycleModal />
    </>
  );
};

export default AdminLayout;
