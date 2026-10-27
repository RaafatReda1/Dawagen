import { ChevronLeft, Truck } from "lucide-react";
import styles from "./BreadcrumbTrail.module.css";

const BreadcrumbTrail = ({ importerName, onClose }) => (
  <nav className={styles.breadcrumbs} aria-label="مسار التنقل">
    <button type="button" className={styles.crumbLink} onClick={onClose}>
      قسم التصدير والمبيعات
    </button>
    <ChevronLeft size={14} className={styles.separator} />
    <span className={styles.crumbSection}>شحنات قيد التحميل</span>
    <ChevronLeft size={14} className={styles.separator} />
    <span className={styles.crumbActive}>
      <Truck size={14} />
      <span>{importerName || "تحميل سيارة تاجر جديدة"}</span>
    </span>
  </nav>
);

export default BreadcrumbTrail;
