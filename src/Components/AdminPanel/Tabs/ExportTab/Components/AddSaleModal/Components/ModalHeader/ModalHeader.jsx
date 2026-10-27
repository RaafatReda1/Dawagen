import { Truck, X } from "lucide-react";
import styles from "./ModalHeader.module.css";

const ModalHeader = ({ isEdit, onClose }) => (
  <div className={styles.header}>
    <div className={styles.titleRow}>
      <div className={styles.iconBox}><Truck size={22} /></div>
      <div>
        <h3 className={styles.title}>{isEdit ? "متابعة تسجيل أوزان ودفعات الحمولة" : "بدء تحميل سيارة تاجر جديدة"}</h3>
        <p className={styles.subtitle}>وزن الأقفاص الفارغة، متابعة التحميل الحي، وتسجيل الدفعات</p>
      </div>
    </div>
    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="إغلاق">
      <X size={20} />
    </button>
  </div>
);

export default ModalHeader;
