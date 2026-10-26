import { Wheat, Plus } from "lucide-react";
import { useFeed } from "../../Contexts/FeedContext";
import styles from "./FeedHeader.module.css";

const FeedHeader = () => {
  const { setIsModalOpen } = useFeed();

  return (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <div className={styles.iconBox}>
          <Wheat size={24} />
        </div>
        <div>
          <h1 className={styles.title}>إدارة وتوريدات الأعلاف</h1>
          <p className={styles.subtitle}>
            متابعة مخزون العلف، شحنات التوريد، ومعدلات الاستهلاك اليومي
          </p>
        </div>
      </div>

      <button
        type="button"
        className={styles.addBtn}
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={16} />
        <span>إضافة شحنة علف جديدة</span>
      </button>
    </div>
  );
};

export default FeedHeader;
