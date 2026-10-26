import { Trash2 } from "lucide-react";
import styles from "./MedicineItemRow.module.css";

const TYPES = ["مل", "لتر", "جرام", "كجم", "جرعة", "قرص / أمبول"];

const MedicineItemRow = ({ item, index, onChange, onRemove, canRemove }) => (
  <div className={styles.itemRow}>
    <input
      type="text" placeholder="اسم الدواء / التحصين" value={item.name}
      onChange={(e) => onChange(index, "name", e.target.value)} className={styles.nameInput} required
    />
    <input
      type="number" placeholder="العبوات" value={item.units_count}
      onChange={(e) => onChange(index, "units_count", e.target.value)} className={styles.numInput} required
    />
    <input
      type="number" step="0.1" placeholder="السعة" value={item.unit_capacity}
      onChange={(e) => onChange(index, "unit_capacity", e.target.value)} className={styles.numInput}
    />
    <select value={item.measurement_type} onChange={(e) => onChange(index, "measurement_type", e.target.value)} className={styles.selectInput}>
      {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
    </select>
    <input
      type="number" step="0.5" placeholder="سعر الوحدة" value={item.unit_price}
      onChange={(e) => onChange(index, "unit_price", e.target.value)} className={styles.numInput} required
    />
    {canRemove && (
      <button type="button" onClick={() => onRemove(index)} className={styles.removeBtn}>
        <Trash2 size={16} />
      </button>
    )}
  </div>
);

export default MedicineItemRow;
