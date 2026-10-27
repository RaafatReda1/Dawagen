import { CheckCircle2 } from "lucide-react";
import styles from "./GrossInputFields.module.css";

const GrossInputFields = ({ weight, setWeight, crates, setCrates, chicks, setChicks, fillStatus, isReadOnly }) => (
  <div className={styles.row}>
    <div className={styles.field}>
      <label>الوزن القائم على الميزان (كجم) *</label>
      <div className={styles.inputWrap}>
        <CheckCircle2 size={18} className={styles.icon} />
        <input type="number" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="مثال: 125.5" disabled={isReadOnly} required autoFocus />
      </div>
    </div>
    <div className={styles.fieldSmall}>
      <label>الأقفاص</label>
      <input type="number" value={crates} onChange={(e) => setCrates(e.target.value)} min="1" disabled={isReadOnly} />
    </div>
    <div className={styles.fieldChicks}>
      <label className={fillStatus !== "full" ? styles.requiredLabel : ""}>عدد الفراخ بالوزنة *</label>
      <input type="number" value={chicks} onChange={(e) => setChicks(e.target.value)} min="1" disabled={isReadOnly || fillStatus === "full"} required />
    </div>
  </div>
);

export default GrossInputFields;
