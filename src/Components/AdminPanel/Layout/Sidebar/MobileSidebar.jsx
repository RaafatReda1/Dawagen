import { useNavigate } from "react-router-dom";
import { useCycles } from "../../Cycles/Context/CycleContext";
import { getGeneralNavItems, getCycleNavItems } from "./navConfig";
import CycleNavHeader from "./CycleNavHeader";
import NavSection from "./NavSection";
import SidebarUserFooter from "./SidebarUserFooter";
import MobileDrawerActions from "./MobileDrawerActions";
import useCycleRouteInfo from "../../Hooks/useCycleRouteInfo";
import styles from "./Sidebar.module.css";

const MobileSidebar = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const { openNewModal } = useCycles();
  const { isViewingHistorical, cycleIdFromUrl, basePath, cycleData } = useCycleRouteInfo();

  return (
    <>
      <div className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`} onClick={onMobileClose} />
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerInner}>
          <div className={styles.drawerLogo}>
            <img src="/logo.png" alt="logo" className={styles.logo} />
            <span className={styles.brandName}>داواجن Dawagen</span>
          </div>
          <MobileDrawerActions
            onNewCycle={() => {
              openNewModal();
              onMobileClose();
            }}
            onOpenCycles={() => {
              navigate("/cycles");
              onMobileClose();
            }}
          />
          <nav className={styles.drawerNav}>
            <NavSection title="عام" items={getGeneralNavItems()} onItemClick={onMobileClose} />
            <div className={styles.drawerDivider} />
            <CycleNavHeader
              isViewingHistorical={isViewingHistorical}
              cycleId={cycleIdFromUrl}
              chickType={cycleData?.chick_type}
            />
            <NavSection items={getCycleNavItems(basePath)} onItemClick={onMobileClose} />
          </nav>
          <SidebarUserFooter isDrawer />
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
