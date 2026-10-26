import { FileText } from "lucide-react";
import { useDrugs } from "../../Contexts/DrugsContext";
import InvoicesTable from "./Components/InvoicesTable/InvoicesTable";
import styles from "./MedicineInvoicesSection.module.css";

const MedicineInvoicesSection = () => {
  const { rawData } = useDrugs();
  const invoices = rawData?.medicineInvoices || [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <FileText size={20} className={styles.icon} />
          <h2 className={styles.title}>سجل فواتير الأدوية والتحصينات</h2>
        </div>
        <span className={styles.badge}>{invoices.length} فواتير مسجلة</span>
      </div>
      <InvoicesTable invoices={invoices} />
    </section>
  );
};

export default MedicineInvoicesSection;
