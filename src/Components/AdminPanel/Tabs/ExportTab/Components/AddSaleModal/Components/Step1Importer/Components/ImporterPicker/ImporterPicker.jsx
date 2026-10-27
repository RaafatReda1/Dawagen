import { User, Check } from "lucide-react";
import styles from "./ImporterPicker.module.css";

const ImporterPicker = ({ importers = [], selectedId, onSelect }) => (
  <div className={styles.grid}>
    {importers.map((imp) => {
      const isSelected = String(selectedId) === String(imp.id);
      const phones = Array.isArray(imp.phone_number) ? imp.phone_number : [];

      return (
        <div
          key={imp.id}
          className={`${styles.card} ${isSelected ? styles.selected : ""}`}
          onClick={() => onSelect(imp)}
        >
          <div className={styles.top}>
            <div className={styles.avatar}><User size={16} /></div>
            <span className={styles.name}>{imp.name}</span>
            {isSelected && <Check size={16} className={styles.checkIcon} />}
          </div>
          <div className={styles.meta}>
            {imp.place && <span className={styles.place}>{imp.place}</span>}
            {phones.length > 0 && <span className={styles.phone}>{phones[0]}</span>}
          </div>
        </div>
      );
    })}
  </div>
);

export default ImporterPicker;
