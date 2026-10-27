import { Truck, Plus } from "lucide-react";
import { useExport } from "../../Contexts/ExportContext";
import SaleCard from "./Components/SaleCard/SaleCard";
import styles from "./SalesListSection.module.css";

const SalesListSection = () => {
  const { sales, openAddModal, openEditModal } = useExport();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Truck size={20} className={styles.icon} />
          <h2 className={styles.title}>سجل سيارات التحميل وشحنات المبيعات</h2>
          <span className={styles.badge}>{sales.length} سيارات محملة</span>
        </div>
        <button type="button" className={styles.addBtn} onClick={() => openAddModal()}>
          <Plus size={16} />
          <span>بدء تحميل جديد</span>
        </button>
      </div>

      {sales.length === 0 ? (
        <div className={styles.empty}>
          <p>لم يتم تسجيل أي عمليات بيع أو تحميل سيارات في هذه الدورة حتى الآن.</p>
          <button type="button" className={styles.startBtn} onClick={() => openAddModal()}>
            بدء تسجيل أول شحنة تحميل
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {sales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} onEdit={openEditModal} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SalesListSection;
