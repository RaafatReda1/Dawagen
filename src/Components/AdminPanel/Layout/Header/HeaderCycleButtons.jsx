import { useNavigate } from "react-router-dom";
import { Plus, History } from "lucide-react";
import styles from "./Header.module.css";

const HeaderCycleButtons = () => {
  const navigate = useNavigate();
  const openNewModal = () => {};

  return (
    <div className={styles.cycleActions}>
      <button className={styles.prevCyclesBtn} onClick={() => navigate('/cycles')} title="الدورات السابقة">
        <History size={16} />
        <span>الدورات السابقة</span>
      </button>
      <button className={styles.newCycleBtn} onClick={openNewModal} title="دورة جديدة">
        <Plus size={16} />
        <span>دورة جديدة</span>
      </button>
    </div>
  );
};

export default HeaderCycleButtons;
