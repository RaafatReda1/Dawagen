import ImporterCard from "../ImporterCard/ImporterCard";
import styles from "./ImportersGrid.module.css";

const ImportersGrid = ({ importers = [], onSelect }) => {
  if (importers.length === 0) {
    return <div className={styles.empty}>لا يوجد تجار مسجلون حالياً. يمكنك إضافة تاجر جديد عند بدء التحميل.</div>;
  }

  return (
    <div className={styles.grid}>
      {importers.map((imp) => (
        <ImporterCard key={imp.id} importer={imp} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ImportersGrid;
