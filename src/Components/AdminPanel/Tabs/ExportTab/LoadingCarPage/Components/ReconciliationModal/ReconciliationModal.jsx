import ComparisonTable from "./Components/ComparisonTable/ComparisonTable";
import ComparisonActions from "./Components/ComparisonActions/ComparisonActions";
import styles from "./ReconciliationModal.module.css";

const ReconciliationModal = ({
  isOpen,
  conflictData,
  onRestoreLocal,
  onKeepServer,
}) => {
  if (!isOpen || !conflictData) return null;

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>تنبيه مزامنة واختلاف البيانات (Data Sync)</h3>
          <p>تم العثور على مسودة محلية بجهازك تختلف عن البيانات المخزنة بالسيرفر. يرجى اختيار النسخة المعتمدة:</p>
        </div>
        <ComparisonTable local={conflictData.local} server={conflictData.server} />
        <ComparisonActions onRestoreLocal={onRestoreLocal} onKeepServer={onKeepServer} />
      </div>
    </>
  );
};

export default ReconciliationModal;
