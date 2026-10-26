import { X, Truck } from "lucide-react";
import styles from "./ShipmentModalHeader.module.css";

const ShipmentModalHeader = ({ onClose }) => (
  <div className={styles.header}>
    <div className={styles.titleRow}>
      <div className={styles.iconBox}>
        <Truck size={18} />
      </div>
      <div>
        <h2 className={styles.title}>تسجيل توريد شحنة علف</h2>
        <span className={styles.sub}>إضافة شحنة جديدة إلى مخزون الدورة</span>
      </div>
    </div>
    <button type="button" onClick={onClose} className={styles.closeBtn} title="إغلاق">
      <X size={18} />
    </button>
  </div>
);

export default ShipmentModalHeader;
