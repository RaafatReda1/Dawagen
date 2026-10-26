import { Syringe, Plus } from "lucide-react";
import { useDrugs } from "../../Contexts/DrugsContext";
import styles from "./DrugsHeader.module.css";

const DrugsHeader = () => {
  const { setIsModalOpen } = useDrugs();

  return (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <div className={styles.iconBox}>
          <Syringe size={24} />
        </div>
        <div>
          <h1 className={styles.title}>إدارة الأدوية والتحصينات</h1>
          <p className={styles.subtitle}>
            متابعة صيدلية المزرعة، فواتير الأدوية والمستلزمات، وسجل الجرعات اليومية
          </p>
        </div>
      </div>

      <button
        type="button"
        className={styles.addBtn}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={16} />
        <span>إضافة فاتورة أدوية جديدة</span>
      </button>
    </div>
  );
};

export default DrugsHeader;
