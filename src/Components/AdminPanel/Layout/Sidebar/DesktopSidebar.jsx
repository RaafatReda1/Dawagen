import { useState } from "react";
import { getGeneralNavItems, getCycleNavItems } from "./navConfig";
import CycleNavHeader from "./CycleNavHeader";
import NavSection from "./NavSection";
import SidebarUserFooter from "./SidebarUserFooter";
import SidebarCollapseToggle from "./SidebarCollapseToggle";
import useCycleRouteInfo from "../../Hooks/useCycleRouteInfo";
import styles from "./Sidebar.module.css";

const DesktopSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isViewingHistorical, cycleIdFromUrl, basePath, cycleData } = useCycleRouteInfo();
  console.log("cycleData", cycleData);
  return (
    <div className={`${styles.pill} ${collapsed ? styles.pillCollapsed : ""}`}>
      <SidebarCollapseToggle collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={styles.logoBox}>
        <img src="/logo.png" alt="logo" className={styles.logo} />
      </div>

      <nav className={styles.navContainer}>
        <NavSection title="عام" items={getGeneralNavItems()} collapsed={collapsed} />
        <div className={styles.divider} />
        <CycleNavHeader
          isViewingHistorical={isViewingHistorical}
          cycleId={cycleIdFromUrl}
          chickType={cycleData?.chick_type}
          collapsed={collapsed}
        />
        <NavSection items={getCycleNavItems(basePath)} collapsed={collapsed} />
      </nav>

      <SidebarUserFooter collapsed={collapsed} />
    </div>
  );
};

export default DesktopSidebar;
