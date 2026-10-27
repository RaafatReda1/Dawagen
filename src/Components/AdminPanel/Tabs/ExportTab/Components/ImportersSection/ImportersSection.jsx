import { Users, Plus } from "lucide-react";
import { useExport } from "../../Contexts/ExportContext";
import ImportersGrid from "./Components/ImportersGrid/ImportersGrid";
import styles from "./ImportersSection.module.css";

const ImportersSection = () => {
  const { importers, openAddModal } = useExport();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Users size={20} className={styles.icon} />
          <h2 className={styles.title}>دليل التجار المعتمدين وسياراتهم</h2>
          <span className={styles.countBadge}>{importers.length} تجار</span>
        </div>
        <button type="button" className={styles.newBtn} onClick={() => openAddModal()}>
          <Plus size={16} />
          <span>إضافة تاجر جديد</span>
        </button>
      </div>

      <ImportersGrid importers={importers} onSelect={(imp) => openAddModal(imp)} />
    </section>
  );
};

export default ImportersSection;
