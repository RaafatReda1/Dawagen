import { FileText, X } from "lucide-react";
import styles from "./InvoiceModalHeader.module.css";

const InvoiceModalHeader = ({ onClose }) => (
  <div className={styles.header}>
    <div className={styles.titleRow}>
      <div className={styles.iconBox}>
        <FileText size={20} />
      </div>
      <div>
        <h2 className={styles.title}>تسجيل فاتورة أدوية وتحصينات</h2>
        <p className={styles.subtitle}>أدخل بيانات التوريد والأصناف المشتراة</p>
      </div>
    </div>
    <button type="button" className={styles.closeBtn} onClick={onClose}>
      <X size={18} />
    </button>
  </div>
);

export default InvoiceModalHeader;
