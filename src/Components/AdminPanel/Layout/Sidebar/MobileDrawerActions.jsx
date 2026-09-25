import { Plus, History } from "lucide-react";
import styles from "./Sidebar.module.css";

const MobileDrawerActions = ({ onNewCycle, onOpenCycles }) => (
  <div className={styles.drawerQuickActions}>
    <button className={styles.drawerNewCycleBtn} onClick={onNewCycle}>
      <Plus size={18} />
      <span>دورة جديدة</span>
    </button>
    <button className={styles.drawerPrevCyclesBtn} onClick={onOpenCycles}>
      <History size={18} />
      <span>الدورات</span>
    </button>
  </div>
);

export default MobileDrawerActions;
