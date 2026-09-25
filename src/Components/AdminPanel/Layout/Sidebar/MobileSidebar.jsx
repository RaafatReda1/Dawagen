import { useNavigate } from "react-router-dom";
import { useCycles } from "../../Cycles/Context/CycleContext";
import { getGeneralNavItems, getCycleNavItems } from "./navConfig";
import CycleNavHeader from "./CycleNavHeader";
import NavSection from "./NavSection";
import SidebarUserFooter from "./SidebarUserFooter";
import MobileDrawerActions from "./MobileDrawerActions";
import styles from "./Sidebar.module.css";

const MobileSidebar = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const { viewedCycle, isViewingHistorical, openNewModal } = useCycles();
  const cycleId = viewedCycle?.id;
  const basePath = isViewingHistorical && cycleId ? `/cycles/${cycleId}` : "/current-cycle";

  return (
    <>
      <div className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`} onClick={onMobileClose} />
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerInner}>
          <div className={styles.drawerLogo}>
            <img src="/logo.png" alt="logo" className={styles.logo} />
            <span className={styles.brandName}>داواجن Dawagen</span>
          </div>
          <MobileDrawerActions onNewCycle={() => { openNewModal(); onMobileClose(); }} onOpenCycles={() => { navigate('/cycles'); onMobileClose(); }} />
          <nav className={styles.drawerNav}>
            <NavSection title="عام" items={getGeneralNavItems()} onItemClick={onMobileClose} />
            <div className={styles.drawerDivider} />
            <CycleNavHeader isViewingHistorical={isViewingHistorical} cycleId={cycleId} chickType={viewedCycle?.chick_type} />
            <NavSection items={getCycleNavItems(basePath)} onItemClick={onMobileClose} />
          </nav>
          <SidebarUserFooter isDrawer />
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
