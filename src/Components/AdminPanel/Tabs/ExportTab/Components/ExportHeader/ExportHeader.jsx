import { Truck, Plus, Radio } from "lucide-react";
import { useExport } from "../../Contexts/ExportContext";
import styles from "./ExportHeader.module.css";

const ExportHeader = () => {
  const { openAddModal, isLive } = useExport();

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <div className={styles.iconBox}><Truck size={24} /></div>
          <div>
            <h1 className={styles.title}>قسم مبيعات وتصدير الدواجن</h1>
            <p className={styles.subtitle}>وزن الأقفاص الفارغة، تحميل الطيور، وإدارة حسابات وسيارات التجار</p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={`${styles.liveBadge} ${isLive ? styles.liveActive : ""}`}>
          <Radio size={14} className={styles.liveIcon} />
          <span>{isLive ? "مزامنة لحظية للموازين" : "الاتصال جارٍ..."}</span>
        </div>
        <button type="button" className={styles.addBtn} onClick={() => openAddModal()}>
          <Plus size={18} />
          <span>بدء تحميل جديد</span>
        </button>
      </div>
    </div>
  );
};

export default ExportHeader;
