import { Check, User } from "lucide-react";
import styles from "./ImporterSelector.module.css";

const ImporterSelector = ({ importers = [], selectedId, onSelect, onBlur }) => (
  <div className={styles.grid}>
    {importers.map((imp) => {
      const isSelected = String(selectedId) === String(imp.id);
      return (
        <div
          key={imp.id}
          className={`${styles.card} ${isSelected ? styles.selected : ""}`}
          onClick={() => { onSelect(imp); if (onBlur) onBlur(); }}
        >
          <div className={styles.top}>
            <div className={styles.avatar}><User size={16} /></div>
            <span className={styles.name}>{imp.name}</span>
            {isSelected && <Check size={16} className={styles.checkIcon} />}
          </div>
          <div className={styles.meta}>
            {imp.place && <span className={styles.place}>{imp.place}</span>}
            {Array.isArray(imp.vehicle_types) && imp.vehicle_types.length > 0 && (
              <span className={styles.vehiclesCount}>{imp.vehicle_types.length} سيارات مسجلة</span>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default ImporterSelector;
