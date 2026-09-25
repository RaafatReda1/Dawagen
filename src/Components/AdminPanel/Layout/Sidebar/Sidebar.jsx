import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const Sidebar = ({ mobile, mobileOpen, onMobileClose }) => {
  if (mobile) return <MobileSidebar mobileOpen={mobileOpen} onMobileClose={onMobileClose} />;
  return <DesktopSidebar />;
};

export default Sidebar;
