import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./Sidebar.module.css";

const SidebarCollapseToggle = ({ collapsed, onToggle }) => (
  <button
    className={styles.collapseToggleBtn}
    onClick={onToggle}
    title={collapsed ? "توسيع القائمة" : "ضغط القائمة"}
    aria-label="Toggle Sidebar"
  >
    {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
  </button>
);

export default SidebarCollapseToggle;
