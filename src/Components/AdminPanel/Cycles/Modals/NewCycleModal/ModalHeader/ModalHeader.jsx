import { PlusCircle, X } from "lucide-react";
import styles from "./ModalHeader.module.css";

const ModalHeader = ({ onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleArea}>
        <div className={styles.iconWrapper}>
          <PlusCircle size={24} />
        </div>
        <div className={styles.titleText}>
          <h2 className={styles.title}>بدء دورة تربية جديدة</h2>
          <p className={styles.subtitle}>أدخل بيانات القطيع الأولية لبدء تتبع الدورة</p>
        </div>
      </div>
      <button className={styles.closeBtn} type="button" onClick={onClose} aria-label="إغلاق">
        <X size={18} />
      </button>
    </div>
  );
};

export default ModalHeader;
